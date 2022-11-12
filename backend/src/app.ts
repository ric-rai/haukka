import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";
import { initialize } from "express-openapi";
import { apiDoc } from "./api/v1/apiDoc";
import oracledb = require("oracledb");
import { Observatory } from "./services/observatory/observatory";
import { Metadata } from "./services/metadata/metadata";
import { createSchema } from "./schema/create";

const { NODE_ENV } = process.env;
const envPath = NODE_ENV === "development" ? ".env.development" : ".env.production";
dotenv.config({ path: path.resolve(process.cwd(), `./${envPath}`) });
const { USERNAME, PASSWORD, HOSTNAME, SERVICE_ID } = process.env;

(async () => {
  const pool = await oracledb.createPool({
    poolAlias: "default",
    user: USERNAME,
    password: PASSWORD,
    connectString: `${HOSTNAME}/${SERVICE_ID}`,
  });
  await createSchema(pool);
  const metadata = await Metadata(pool);
  Observatory(pool, metadata).init();
})();

const app = express();
const port = process.env.PORT || 8080;

initialize({
  app,
  apiDoc: apiDoc,
  paths: "./dist/api/v1/paths",
});

app.listen(8080, () => {
  console.log(`Listening on port ${port}`);
});
