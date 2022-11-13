import oracledb = require("oracledb");
import { parseStatements } from "../../utils";
import * as path from "path";
import type { MetadataService } from "../metadata/metadata";
import { locations } from "../../locations";

const statements = parseStatements(path.join(__dirname, "./observatory.sql"));

export type Observatory = Awaited<ReturnType<typeof Observatory>>;

export const Observatory = async (pool: oracledb.Pool, metadataService: MetadataService) => {
  const SQL = (cnx: oracledb.Connection) => ({
    insert: async (name: string, actions: string) => {
      return await cnx.execute(statements.INSERT, {
        metadata: await metadataService.create(cnx),
        ...{ name, actions },
      });
    },
  });

  const cnx = await pool.getConnection();
  for (const observatory of locations.observatories) {
    let name: string | null = null;
    try {
      ({ observatory: name } = observatory);
      await SQL(cnx).insert(name, "test_actions");
    } catch (err) {
      const error = err as { message: string };
      if (error?.message.includes("(APP.OBSERVATORY_NAME_IS_UNIQUE) violated")) {
        console.info(`Observatory ${name} already exists! Skipping...`);
        continue;
      }
      throw new Error(error?.message);
    }
  }
  await cnx.commit();
  await cnx.close();

  return {};
};
