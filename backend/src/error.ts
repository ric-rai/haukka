import { NextFunction, Request, Response } from "express";
import OpenAPIResponseValidator from "openapi-response-validator";

type OpenApiValidationError = ReturnType<OpenAPIResponseValidator["validateResponse"]>;
type StatusCode = 503 | 502 | 500 | 404 | 403 | 400;

export const errorHandler = (
  err: Error | (Error & { code: StatusCode }),
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.stack && console.error(err.stack);
  let code, error;
  // If there is no stack, it is probably express-openapi request validation error
  if (!err.stack) {
    code = (err as unknown as { status: StatusCode }).status;
    if (code === 400) {
      error = { cause: "400 Bad Request", ...err };
    }
    // All Error classes defined in this file have a code property.
  } else if ("code" in err) {
    code = err.code;
    error = err;
    // This is the default error for all other errors.
  } else {
    code = 500;
    error = {
      name: err.name,
      cause: "Internal server error",
      message: err.message,
    };
  }
  const validationError = res.validateResponse("default", error);
  if (validationError) {
    console.error(`Check error schema definitions!`);
    console.error(validationError);
  }
  return res.status(code).json(error);
};

export class ResponseValidationError extends Error {
  public invalidResponse: object | null;
  public validationErrors: any;
  public code = 503;

  constructor(validationError: OpenApiValidationError, invalidResponse: object | null) {
    super(validationError.message);
    this.name = "OpenApiResponseValidationError";
    this.cause = "OpenAPI response validation error";
    this.validationErrors = validationError.errors;
    this.invalidResponse = invalidResponse;
  }
}

export class ServiceError extends Error {
  public code: StatusCode;
  public payload: object | undefined;

  constructor(code: StatusCode, payload: string | (object & { message?: string })) {
    let message;
    if (typeof payload === "object")
      if ("message" in payload) message = payload.message;
      else message = JSON.stringify(payload);
    super(message);
    this.name = "ServiceError";
    this.code = code;
    this.payload = typeof payload === "object" ? payload : void 0;
    const service = this.stack?.match(/services\/(\w+)/)?.[1] + "Service" || "";
    this.cause = `Error from service module ${service}`;
  }
}
