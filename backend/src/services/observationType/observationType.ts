import oracledb = require("oracledb");
import { parseStatements } from "../../utils";
import * as path from "path";
import type { MetadataService } from "../metadata/metadata";
import { locations } from "../../locations";
import { ObservatoryService } from "../observatory/observatory";

const statements = parseStatements(path.join(__dirname, "./observationType.sql"));

export type ObservationTypeService = Awaited<ReturnType<typeof ObservationTypeService>>;

export const ObservationTypeService = async (
  pool: oracledb.Pool,
  metadataService: MetadataService,
  observatoryService: ObservatoryService
) => {
  const SQL = (cnx: oracledb.Connection) => ({
    insert: async (name: string, observatory: number) => {
      return await cnx.execute(statements.INSERT, {
        metadata: await metadataService.create(cnx),
        ...{ name, observatory },
      });
    },
  });

  const cnx = await pool.getConnection();
  for (const observatory of locations.observatories) {
    const { name: obsName } = observatory;
    for (const name of observatory.observationTypes) {
      try {
        const obs = await observatoryService.getByName(obsName);
        if (!obs) throw new Error(`Observatory ${obsName} does not exist!`);
        await SQL(cnx).insert(name, obs.id);
      } catch (err) {
        const error = err as { message: string };
        if (error?.message.includes("(APP.UNIQUE_OBSERVATION_TYPE_IN_OBSERVATORY) violated")) {
          console.info(
            `Observation type ${name} in observatory ${obsName} already exists! Skipping...`
          );
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
