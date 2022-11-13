import oracledb = require("oracledb");

export type Metadata = Awaited<ReturnType<typeof Metadata>>;

type Type = oracledb.DBObjectClass<{
  DATE_CREATED: Date;
  DATE_MODIFIED: Date;
  IS_DELETED: 0 | 1;
}>;

export const Metadata = async () => {
  return {
    create: async (connection: oracledb.Connection) => {
      const MetadataType: Type = await connection.getDbObjectClass("APP.METADATA");
      return new MetadataType({
        DATE_CREATED: new Date(),
        DATE_MODIFIED: new Date(),
        IS_DELETED: 0,
      });
    },
  };
};
