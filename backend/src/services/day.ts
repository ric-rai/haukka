import oracledb = require("oracledb");
import { ObservatoryDay } from "../api/v1/generated/models/ObservatoryDay";

type DayRow = [Date, string, string, string];
type Result = oracledb.Result<DayRow>;

export type DayService = Awaited<ReturnType<typeof DayService>>;

export const DayService = async (pool: oracledb.Pool) => {
  return {
    new: async (day: ObservatoryDay) /* : Promise<ObservatoryDay> */ => {
      const cnx = await pool.getConnection();
      const insert = `INSERT INTO Observatory_Day (data) VALUES (:data)`;
      const result = await cnx.execute(insert, { data: JSON.stringify(day) }, { autoCommit: true });
      console.log(result);
    },
  };
};
