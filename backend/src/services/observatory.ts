import oracledb = require("oracledb");
import { locations } from "../locations";
import { ServiceError } from "../error";
import { Observatory } from "../api/v1/generated/models/Observatory";

type ObservatoryRow = [string, string, string, string, string];
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
      const result = (await cnx.execute(selectAll)) as Result;
      await cnx.close();
      let rows = result?.rows;
      if (!rows || !rows.length) return [];
      return rows.map((row) => {
        return {
          name: row[0] as Observatory["name"],
          metadata: JSON.parse(row[1], (k, v) => (k === "isDeleted" ? parseInt(v) : v)),
          actions: JSON.parse(row[2]),
          locations: JSON.parse(row[3]),
          observationTypes: JSON.parse(row[4]),
        };
      });
    },
    getByName: async (name: string): Promise<Observatory> => {
      const cnx = await pool.getConnection();
      const selectByName = `SELECT * FROM Observatory WHERE name = :name`;
      const result = (await cnx.execute(selectByName, { name })) as Result;
      await cnx.close();
      let observatory = result?.rows?.[0];
      if (!observatory) throw new ServiceError(404, `Observatory ${name} not found!`);
      return {
        name: observatory[0] as Observatory["name"],
        metadata: JSON.parse(observatory[1], (k, v) => (k === "isDeleted" ? parseInt(v) : v)),
        actions: JSON.parse(observatory[2]),
        locations: JSON.parse(observatory[3]),
        observationTypes: JSON.parse(observatory[4]),
      };
    },
  };
};
