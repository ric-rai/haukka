import oracledb = require("oracledb");
import { locations } from "../../locations";

export type ObservationTypeService = Awaited<ReturnType<typeof ObservationTypeService>>;

export const ObservationTypeService = async (pool: oracledb.Pool) => {
  const cnx = await pool.getConnection();
  for (const observatory of locations.observatories) {
    const { name: obsName } = observatory;
    for (const name of observatory.observationTypes) {
      try {
        await cnx.execute("INSERT INTO Observation_Type (name) VALUES (:name)", { name });
      } catch (err) {
        const error = err as { message: string };
        if (error?.message.match(/unique constraint .+? violated/)) {
          console.info(`Observation type ${name} already exists! Skipping...`);
          continue;
        }
        throw new Error(error?.message);
      }
    }
  }
  await cnx.commit();
  await cnx.close();

  return {};
};
