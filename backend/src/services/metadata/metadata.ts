import oracledb = require("oracledb");

export type Metadata = Awaited<ReturnType<typeof Metadata>>;

export const Metadata = async (pool: oracledb.Pool) => {
  const connection = await pool.getConnection();
  const MetadataType: oracledb.DBObjectClass<{
    DATE_CREATED: Date;
    DATE_MODIFIED: Date;
    IS_DELETED: 0 | 1;
  }> = await connection.getDbObjectClass("APP.META_DATA");

  return {
    create: () => {
      return new MetadataType({
        DATE_CREATED: new Date(),
        DATE_MODIFIED: new Date(),
        IS_DELETED: 0,
      });
    },
  };
};
