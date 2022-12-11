import { Operation } from "express-openapi";
import { ObservatoryService } from "../../../services/observatory";
import { ApiDoc } from "../apiDoc";
import OpenAPIResponseValidator from "openapi-response-validator";
import { ResponseValidationError } from "../../../error";

export default function (observatoryService: ObservatoryService): { GET: Operation } {
  return {
    GET: async (req, res, next) => {
      try {
        const { apiDoc } = req as typeof req & { apiDoc: ApiDoc };
        const validator = new OpenAPIResponseValidator({
          responses: apiDoc.paths["/observatory"].get.responses,
          components: apiDoc.components,
        });
        const observatories = await observatoryService.getAll();
        const validationError = validator.validateResponse(200, observatories);
        if (validationError)
          return next(new ResponseValidationError(validationError, observatories));
        return res.status(200).json(observatories);
      } catch (error) {
        return next(error);
      }
    },
  };
}
