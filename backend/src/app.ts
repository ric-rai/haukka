import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";
import oracledb = require("oracledb");
import { createSchema } from "./schema/create";
import { Observatory } from "./services/observatory/observatory";
import { MetadataService } from "./services/metadata/metadata";
import { Account } from "./services/account/account";
import { initialize } from "express-openapi";
import { apiDoc } from "./api/v1/apiDoc";

const { NODE_ENV } = process.env;
const envPath = NODE_ENV === "development" ? ".env.development" : ".env.production";
dotenv.config({ path: path.resolve(process.cwd(), `./${envPath}`) });
const { USERNAME, PASSWORD, HOSTNAME, SERVICE_ID, PORT } = process.env;

const app = express();
const port = PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

(async () => {
  const pool = await oracledb.createPool({
    poolAlias: "default",
    user: USERNAME,
    password: PASSWORD,
    connectString: `${HOSTNAME}/${SERVICE_ID}`,
  });
  await createSchema(pool);
  const metadataService = await MetadataService();
  const observatory = await Observatory(pool, metadataService);
  const account = await Account(pool, metadataService);

  initialize({
    app,
    apiDoc: apiDoc,
    dependencies: {
      account,
    },
    paths: "./dist/api/v1/paths",
  });
})().catch((err) => {
  console.error(err);
});

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
