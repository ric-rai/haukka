import OpenAPIResponseValidator from "openapi-response-validator";

declare global {
  export namespace Express {
    export interface Response {
      validateResponse: OpenAPIResponseValidator["validateResponse"];
    }
  }
}
