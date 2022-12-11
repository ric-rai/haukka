import * as path from "path";
import * as fs from "fs";
import * as oracledb from "oracledb";

export const createSchema = async (pool: oracledb.Pool) => {
  const cnx = await pool.getConnection();
  try {
    const filename = path.join(__dirname, "./schema.sql");
    const statements = fs
      .readFileSync(filename, "utf8")
      .replace(/--.+?\n/g, "")
      .split("\n\n")
      .filter(Boolean);
    for (const statement of statements) {
      try {
        await cnx.execute(statement);
        console.info(
          "Executed statement",
          statement.match(/CREATE (OR REPLACE|TABLE\n)(\w| )+/)?.[0]
        );
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
    await cnx.close();
  } catch (err) {
    console.error(err);
    await cnx.close();
  }
};
