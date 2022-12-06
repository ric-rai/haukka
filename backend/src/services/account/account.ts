import oracledb = require("oracledb");
import { https, LajiUser, parseStatements, TupleToObject } from "../../utils";

type UserRow = [number, string, string, string, string, number];
type User = TupleToObject<
  UserRow,
  ["id", "metadata", "identity", "fullName", "email", "observatory"]
>;
type Result = oracledb.Result<UserRow>;

export type AccountService = Awaited<ReturnType<typeof AccountService>>;

export const AccountService = async (pool: oracledb.Pool) => {
  const { ALLOWED_ROLES, API_DOMAIN, API_TOKEN } = process.env;
  if (!ALLOWED_ROLES) throw new Error("Missing ALLOWED_ROLES");

  return {
    getAccount: async (personToken: string) => {
      const apiUrl = `${API_DOMAIN}/v0/person/${personToken}?access_token=${API_TOKEN}`;
      const response = await https.get(apiUrl).catch((err) => console.error(err));
      if (!response) return 404;
      const lajiUser = JSON.parse(response) as LajiUser;
      if (!lajiUser.role.some((r) => ALLOWED_ROLES.includes(r))) return 403;
      const cnx = await pool.getConnection();
      const { emailAddress: email } = lajiUser;
      const selectByEmail = `SELECT * FROM Person WHERE email = :email`;
      let result = cnx.execute(selectByEmail, { email }) as Result;
      let account = result?.rows?.[0];
      if (!account) {
        const sql = `INSERT INTO Person (id, name, email) VALUES (:id, :fullName, :emailAddress)`;
        const { id: lajiId, fullName, emailAddress } = lajiUser;
        const person = { id: lajiId.replace("MA.", ""), fullName, emailAddress };
        await cnx.execute(sql, person);
        await cnx.commit();
        result = await cnx.execute(selectByEmail, { email });
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
          } as User)
        : 500;
    },
  };
};
