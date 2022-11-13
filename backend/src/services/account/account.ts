import * as path from "path";
import oracledb = require("oracledb");
import { https, LajiUser, parseStatements } from "../../utils";
import { Metadata, MetadataService } from "../metadata/metadata";

const statements = parseStatements(path.join(__dirname, "./account.sql"));

type Result = oracledb.Result<
  [
    id: number,
    metadata: Metadata,
    user_identity: string,
    full_name: string,
    email: string,
    observatory: number
  ]
>;

type Person = {
  metadata: Metadata;
  id: string;
  fullName: string;
  email: string;
  observatory: number;
};

export type Account = Awaited<ReturnType<typeof Account>>;

export const Account = async (pool: oracledb.Pool, metadataService: MetadataService) => {
  const { ALLOWED_ROLES, API_DOMAIN, API_TOKEN } = process.env;
  if (!ALLOWED_ROLES) throw new Error("Missing ALLOWED_ROLES");

  const SQL = (cnx: oracledb.Connection) => ({
    selectByEmail: async (email: string) =>
      (await cnx.execute(statements.SELECT_BY_EMAIL, { email })) as Result,
    insert: async (user: LajiUser) => {
      const { id, fullName, emailAddress } = user;
      return await cnx.execute(statements.INSERT, {
        metadata: await metadataService.create(cnx),
        ...{ id, fullName, emailAddress },
      });
    },
  });

  return {
    getPerson: async (personToken: string) => {
      const apiUrl = `${API_DOMAIN}/v0/person/${personToken}?access_token=${API_TOKEN}`;
      const response = await https.get(apiUrl).catch((err) => console.error(err));
      if (!response) return 404;
      const lajiUser = JSON.parse(response) as LajiUser;
      if (!lajiUser.role.some((r) => ALLOWED_ROLES.includes(r))) return 403;
      const cnx = await pool.getConnection();
      const sql = SQL(cnx);
      let result = await sql.selectByEmail(lajiUser.emailAddress);
      let person = result?.rows?.[0];
      if (!person) {
        await sql.insert(lajiUser).catch((err) => console.error(err));
        await cnx.commit();
        result = await sql.selectByEmail(lajiUser.emailAddress);
        person = result?.rows?.[0];
      }
      await cnx.close();
      return person
        ? ({
            metadata: person[1],
            id: person[2],
            fullName: person[3],
            email: person[4],
            observatory: person[5],
          } as Person)
        : 500;
    },
  };
};
