import oracledb = require("oracledb");
import { parseStatements } from "../../utils";
import * as path from "path";
import type { Metadata } from "../metadata/metadata";
import { locations } from "../../locations";

const statements = parseStatements(path.join(__dirname, "./statements.sql"));

export type Observatory = ReturnType<typeof Observatory>;

export const Observatory = (pool: oracledb.Pool, metadata: Metadata) => ({
  init: async () => {
    const connection = await pool.getConnection();
    let isInserted: boolean = false;
    for (const observatory of locations.observatories) {
      const { observatory: name } = observatory;
      const result = await connection.execute(statements.SELECT_BY_NAME, { name });
      // HEADS UP! This won't update the observatory if it already exists.
      if (!((result?.rows?.length || 0) > 0)) {
        isInserted = true;
        await connection.execute(statements.INSERT, {
          name,
          meta_data: metadata.create(),
          actions: "testactions",
        });
      }
    }
    if (isInserted) connection.commit();
  },
});
