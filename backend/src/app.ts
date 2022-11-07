import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";
import { initialize } from "express-openapi";
import { apiDoc } from "./api/v1/apiDoc";

const { NODE_ENV } = process.env;
const envPath = NODE_ENV === "development" ? ".env.development" : ".env.production";
dotenv.config({ path: path.resolve(process.cwd(), `./${envPath}`) });

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
