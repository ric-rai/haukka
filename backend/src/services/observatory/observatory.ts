import oracledb = require("oracledb");
import { parseStatements, TupleToObject } from "../../utils";
import * as path from "path";
import type { Metadata, MetadataService } from "../metadata/metadata";
import { locations } from "../../locations";

const statements = parseStatements(path.join(__dirname, "./observatory.sql"));

type ObservatoryRow = [number, Metadata, number, string];
type Observatory = TupleToObject<ObservatoryRow, ["id", "metadata", "observatory", "name"]>;
type Result = oracledb.Result<ObservatoryRow>;

export type ObservatoryService = Awaited<ReturnType<typeof ObservatoryService>>;

export const ObservatoryService = async (pool: oracledb.Pool, metadataService: MetadataService) => {
  const SQL = (cnx: oracledb.Connection) => ({
    selectByName: async (name: string) => {
      return (await cnx.execute(statements.SELECT_BY_NAME, { name })) as Result;
    },
    insert: async (name: string, actions: string) => {
      return await cnx.execute(statements.INSERT, {
        metadata: await metadataService.create(cnx),
        ...{ name, actions },
      });
    },
  });

  const cnx = await pool.getConnection();
  for (const observatory of locations.observatories) {
    const { name } = observatory;
    try {
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

  return {
    getByName: async (name: string): Promise<Observatory | null> => {
      const cnx = await pool.getConnection();
      const { rows } = await SQL(cnx).selectByName(name);
      await cnx.close();
      if (!rows) return null;
      return {
        id: rows[0][0],
        metadata: rows[0][1],
        observatory: rows[0][2],
        name: rows[0][3],
      };
    },
  };
};
