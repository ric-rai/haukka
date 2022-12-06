import oracledb = require("oracledb");
import { parseStatements, TupleToObject } from "../../utils";
import * as path from "path";
import { locations } from "../../locations";

const statements = parseStatements(path.join(__dirname, "./observatory.sql"));

type ObservatoryRow = [number, string, number, string];
type Observatory = TupleToObject<ObservatoryRow, ["id", "metadata", "observatory", "name"]>;
type Result = oracledb.Result<ObservatoryRow>;

export type ObservatoryService = Awaited<ReturnType<typeof ObservatoryService>>;

export const ObservatoryService = async (pool: oracledb.Pool) => {
  const cnx = await pool.getConnection();
  for (const observatory of locations.observatories) {
    const { name, actions, locations, observationTypes } = observatory;
    try {
      await cnx.execute(
        `INSERT INTO Observatory ( 
          name, actions, locations, observation_types
        ) VALUES ( :name, :actions, :locations, :obsTypes )`,
        {
          name,
          actions: JSON.stringify(actions),
          locations: JSON.stringify(locations),
          obsTypes: JSON.stringify(observationTypes),
        }
      );
    } catch (err) {
      const error = err as { errorNum: number; message: string };
      if (error?.errorNum === 1) {
        console.info(`Observatory ${name} already exists! Skipping...`);
        continue;
      }
      throw new Error(error?.message);
    }
  }
  await cnx.commit();
  await cnx.close();

  return {
    /* getByName: async (name: string): Promise<Observatory | null> => {
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
    } */
  };
};
