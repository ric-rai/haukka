import * as dotenv from "dotenv";
import * as oracledb from "oracledb";

dotenv.config();
const { USERNAME, PASSWORD, HOSTNAME, SERVICEID } = process.env;

(async () => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: USERNAME,
      password: PASSWORD,
      connectString: `${HOSTNAME}/${SERVICEID}`,
    });
    console.log("Successfully connected to Oracle Database");
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
