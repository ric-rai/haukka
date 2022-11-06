import * as path from "path";
import * as fs from "fs";
import * as dotenv from "dotenv";
import * as oracledb from "oracledb";

dotenv.config();
const { USERNAME, PASSWORD, HOSTNAME, SERVICEID } = process.env;

(async () => {
  let connection: oracledb.Connection | void = void 0;

  try {
    connection = await oracledb.getConnection({
      user: USERNAME,
      password: PASSWORD,
      connectString: `${HOSTNAME}/${SERVICEID}`,
    });
    await runSql(connection);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
})();

async function runSql(connection: oracledb.Connection) {
  const filename = path.join(__dirname, "./schema.sql");
  const statements = fs.readFileSync(filename, "utf8").split(";\n").filter(Boolean).slice(0, -1);
  for (const statement of statements) {
    await connection.execute(statement);
  }
}
