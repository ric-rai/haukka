import { Operation } from "express-openapi";
import { ObservatoryService } from "../../../../services/observatory";
import { ApiDoc } from "../../apiDoc";
import OpenAPIResponseValidator from "openapi-response-validator";
import { ResponseValidationError } from "../../../../error";

export default function (observatoryService: ObservatoryService): { GET: Operation } {
  return {
    GET: async (req, res, next) => {
      try {
        const { apiDoc } = req as typeof req & { apiDoc: ApiDoc };
        const { name } = req.params;
        const observatory = await observatoryService.getByName(name);
        const validator = new OpenAPIResponseValidator({
          responses: apiDoc.paths["/observatory/{name}"].get.responses,
          components: apiDoc.components,
        });
        const validationError = validator.validateResponse(200, observatory);
        if (validationError) return next(new ResponseValidationError(validationError, observatory));
        return res.status(200).json(observatory);
      } catch (error) {
        return next(error);
      }
    },
  };
}
