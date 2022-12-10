import oracledb = require("oracledb");
import { TupleToObject } from "../utils";
import { locations } from "../locations";

type ObservatoryRow = [string, string, string, string, string];
type Observatory = TupleToObject<
  ObservatoryRow,
  ["name", "metadata", "actions", "locations", "observationTypes"]
>;
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
    getAll: async (): Promise<Observatory[]> => {
      const cnx = await pool.getConnection();
      const selectAll = `SELECT * FROM Observatory`;
      const { rows } = (await cnx.execute(selectAll)) as Result;
      await cnx.close();
      if (!rows) return [];
      return rows.map(
        (row) =>
          ({
            name: row[0],
            metadata: row[1],
            actions: row[2],
            locations: row[3],
            observationTypes: row[4],
          } as Observatory)
      );
    },
    getByName: async (name: string): Promise<Observatory | null> => {
      const cnx = await pool.getConnection();
      const selectByName = `SELECT * FROM Observatory WHERE name = :name`;
      const { rows } = (await cnx.execute(selectByName, { name })) as Result;
      await cnx.close();
      if (!rows) return null;
      return {
        name: rows[0][0],
        metadata: rows[0][1],
        actions: rows[0][2],
        locations: rows[0][3],
        observationTypes: rows[0][4],
      };
    },
  };
};
