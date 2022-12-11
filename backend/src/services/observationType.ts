import oracledb = require("oracledb");
import { locations } from "../locations";
import { ApiDoc } from "../api/v1/apiDoc";

export type ObservationTypeService = Awaited<ReturnType<typeof ObservationTypeService>>;

export const ObservationTypeService = async (pool: oracledb.Pool) => {
  return {
    init: async (apiDoc: ApiDoc) => {
      const cnx = await pool.getConnection();
      const { schemas } = apiDoc.components;
      const keys = Object.keys(schemas).filter((k) => k.startsWith("ObservationType"));
      const types = (keys as Extract<keyof typeof schemas, `ObservationType_${string}`>[])
        .map((k) => schemas[k].enum)
        .flat();
      for (const name of types) {
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
      await cnx.commit();
      await cnx.close();
    },
  };
};
