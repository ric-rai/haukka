import * as path from "path";
import oracledb = require("oracledb");
import { https, LajiUser, parseStatements, TupleToObject } from "../../utils";
import { Metadata, MetadataService } from "../metadata/metadata";

const statements = parseStatements(path.join(__dirname, "./account.sql"));

type AccountRow = [number, Metadata, string, string, string, number];
type Account = TupleToObject<
  AccountRow,
  ["id", "metadata", "identity", "fullName", "email", "observatory"]
>;
type Result = oracledb.Result<AccountRow>;

export type AccountService = Awaited<ReturnType<typeof AccountService>>;

export const AccountService = async (pool: oracledb.Pool, metadataService: MetadataService) => {
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
    getAccount: async (personToken: string) => {
      const apiUrl = `${API_DOMAIN}/v0/person/${personToken}?access_token=${API_TOKEN}`;
      const response = await https.get(apiUrl).catch((err) => console.error(err));
      if (!response) return 404;
      const lajiUser = JSON.parse(response) as LajiUser;
      if (!lajiUser.role.some((r) => ALLOWED_ROLES.includes(r))) return 403;
      const cnx = await pool.getConnection();
      const sql = SQL(cnx);
      let result = await sql.selectByEmail(lajiUser.emailAddress);
      let account = result?.rows?.[0];
      if (!account) {
        await sql.insert(lajiUser).catch((err) => console.error(err));
        await cnx.commit();
        result = await sql.selectByEmail(lajiUser.emailAddress);
        account = result?.rows?.[0];
      }
      await cnx.close();
      return account
        ? ({
            id: account[0],
            metadata: account[1],
            identity: account[2],
            fullName: account[3],
            email: account[4],
            observatory: account[5],
          } as Account)
        : 500;
    },
  };
};
