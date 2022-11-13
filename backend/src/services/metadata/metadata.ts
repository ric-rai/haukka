import oracledb = require("oracledb");

export type MetadataService = Awaited<ReturnType<typeof MetadataService>>;

export type Metadata = {
  DATE_CREATED: Date;
  DATE_MODIFIED: Date;
  IS_DELETED: 0 | 1;
};

type MetadataType = oracledb.DBObjectClass<Metadata>;

export const MetadataService = async () => {
  return {
    create: async (connection: oracledb.Connection) => {
      const MetadataType: MetadataType = await connection.getDbObjectClass("APP.METADATA");
      return new MetadataType({
        DATE_CREATED: new Date(),
        DATE_MODIFIED: new Date(),
        IS_DELETED: 0,
      });
    },
  };
};
