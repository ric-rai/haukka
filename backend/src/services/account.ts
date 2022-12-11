import oracledb = require("oracledb");
import { https, LajiUser } from "../utils";
import { ServiceError } from "../error";
import { Metadata } from "../api/v1/generated/models/Metadata";

type UserRow = [number, string, string, string, string, string];
type User = {
  id: number;
  metadata: Metadata;
  identity: string;
  fullName: string;
  email: string;
  observatory: string;
};
type Result = oracledb.Result<UserRow>;

export type AccountService = Awaited<ReturnType<typeof AccountService>>;

export const AccountService = async (pool: oracledb.Pool) => {
  const { ALLOWED_ROLES, API_DOMAIN, API_TOKEN } = process.env;
  if (!ALLOWED_ROLES) throw new Error("Missing ALLOWED_ROLES");

  return {
    getAccount: async (personToken: string): Promise<User> => {
      const apiUrl = `${API_DOMAIN}/v0/person/${personToken}?access_token=${API_TOKEN}`;
      const response = await https.get(apiUrl).catch((err) => {
        throw new ServiceError(502, err);
      });

      const lajiUser = JSON.parse(response) as LajiUser | object;
      if ("error" in lajiUser) throw new ServiceError(502, lajiUser);
      if (!("id" in lajiUser) || !lajiUser.id.startsWith("MA."))
        throw new ServiceError(404, `Unable to find user data for ${personToken}`);
      if (!lajiUser.role.some((r) => ALLOWED_ROLES.includes(r)))
        throw new ServiceError(403, `User doesn't have required role!`);

      const cnx = await pool.getConnection();
      const { emailAddress: email } = lajiUser;
      const selectByEmail = `SELECT * FROM Person WHERE email = :email`;
      let result = cnx.execute(selectByEmail, { email }) as Result;
      let account = result?.rows?.[0];

      if (!account) {
        const insert = `INSERT INTO Person (id, name, email) VALUES (:id, :fullName, :emailAddress)`;
        const { id: lajiId, fullName, emailAddress } = lajiUser;
        const person = { id: lajiId.replace("MA.", ""), fullName, emailAddress };
        await cnx.execute(insert, person);
        await cnx.commit();
        result = (await cnx.execute(selectByEmail, { email })) as Result;
        account = result?.rows?.[0];
      }

      await cnx.close();
      if (!account) throw new ServiceError(500, `Unable to create an account for ${email}`);

      return {
        id: account[0],
        metadata: JSON.parse(account[1]),
        identity: account[2],
        fullName: account[3],
        email: account[4],
        observatory: account[5],
      };
    },
  };
};
