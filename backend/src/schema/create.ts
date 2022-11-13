import * as path from "path";
import * as fs from "fs";
import * as oracledb from "oracledb";

export const createSchema = async (pool: oracledb.Pool) => {
  const connection = await pool.getConnection();
  try {
    const filename = path.join(__dirname, "./schema.sql");
    const statements = fs.readFileSync(filename, "utf8").split(";\n").filter(Boolean).slice(0, -1);
    for (const statement of statements) {
      try {
        await connection.execute(statement);
        console.info("Executed statement", statement);
      } catch (err) {
        const error = err as { errorNum: number; message: string };
        if (error?.errorNum === 955) {
          const [, name] = statement.match(/CREATE (\w+?( |\n)+?\w+)/) || [];
          console.info(`${name.replace(/(\n|\s)+/, " ")} already exists! Skipping...`);
          continue;
        }
        throw new Error(error?.message);
      }
    }
    connection.close();
  } catch (err) {
    console.error(err);
    connection.close();
  }
};
