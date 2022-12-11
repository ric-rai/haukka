import { NextFunction, Request, Response } from "express";
import OpenAPIResponseValidator from "openapi-response-validator";

type OpenApiValidationError = ReturnType<OpenAPIResponseValidator["validateResponse"]>;
type ErrorCode = 503 | 500 | 404 | 403;

export const errorHandler = (
  err: Error | (Error & { code: ErrorCode }),
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  if ("code" in err) return res.status(err.code).json(err);
  return res.status(500).json({
    cause: "Internal server error",
    message: err.message,
  });
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
  public code: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.name = "ServiceError";
    this.code = code;
    const service = this.stack?.match(/services\/(\w+)/)?.[1] + "Service" || "";
    this.cause = `Error from service module ${service}`;
  }
}
