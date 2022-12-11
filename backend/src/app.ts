import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import oracledb = require("oracledb");
import { createSchema } from "./schema/create";
import { ObservationTypeService } from "./services/observationType";
import { ObservatoryService } from "./services/observatory";
import { AccountService } from "./services/account";
import { DayService } from "./services/day";
import { initialize } from "express-openapi";
import { errorHandler } from "./error";
import { ApiDoc } from "./api/v1/apiDoc";

const { NODE_ENV } = process.env;
const envPath = NODE_ENV === "development" ? ".env.development" : ".env.production";
dotenv.config({ path: path.resolve(process.cwd(), `./${envPath}`) });
const { USERNAME, PASSWORD, HOSTNAME, SERVICE_ID, PORT } = process.env;

const app = express();
const port = PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

oracledb.fetchAsBuffer = [oracledb.BLOB];

(async () => {
  const pool = await oracledb.createPool({
    poolAlias: "default",
    user: USERNAME,
    password: PASSWORD,
    connectString: `${HOSTNAME}/${SERVICE_ID}`,
  });
  await createSchema(pool);
  const observationTypeService = await ObservationTypeService(pool);
  const observatoryService = await ObservatoryService(pool);
  const accountService = await AccountService(pool);
  const dayService = await DayService(pool);

  const OpenAPIFramework = await initialize({
    app,
    apiDoc: "./src/api/v1/apiDoc.yml",
    dependencies: {
      accountService,
      observatoryService,
      dayService,
    },
    paths: "./dist/api/v1/paths",
    errorMiddleware: errorHandler,
  });

  const apiDoc = OpenAPIFramework.apiDoc as ApiDoc;
  observationTypeService.init(apiDoc);
})().catch((err) => {
  console.error(err);
});

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
