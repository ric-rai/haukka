import oracledb = require("oracledb");
import { parseStatements } from "../../utils";
import * as path from "path";
import type { Metadata } from "../metadata/metadata";
import { locations } from "../../locations";

const statements = parseStatements(path.join(__dirname, "./observatory.sql"));

export type Observatory = Awaited<ReturnType<typeof Observatory>>;

export const Observatory = async (pool: oracledb.Pool, metadata: Metadata) => {
  const connection = await pool.getConnection();
  for (const observatory of locations.observatories) {
    let name: string | null = null;
    try {
      ({ observatory: name } = observatory);
      await connection.execute(statements.INSERT, {
        name,
        metadata: await metadata.create(connection),
        actions: "testactions",
      });
    } catch (err) {
      const error = err as { message: string };
      if (error?.message.includes("(APP.OBSERVATORY_NAME_IS_UNIQUE) violated")) {
        console.info(`Observatory ${name} already exists! Skipping...`);
        continue;
      }
      throw new Error(error?.message);
    }
  }
  connection.commit();
  connection.close();
  return {};
};
