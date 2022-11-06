import * as express from "express";
import { initialize } from "express-openapi";
import { apiDoc } from "./api/v1/apiDoc";

const app = express();

initialize({
  app,
  apiDoc: apiDoc,
  paths: "./dist/api/v1/paths",
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
