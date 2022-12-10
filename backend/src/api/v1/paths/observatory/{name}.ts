import { Operation } from "express-openapi";
import { ObservatoryService } from "../../../../services/observatory";
import { ApiDoc } from "../../apiDoc";
import OpenAPIResponseValidator from "openapi-response-validator";

export default function (observatoryService: ObservatoryService): { GET: Operation } {
  return {
    GET: async (req, res, next) => {
      const { apiDoc } = req as typeof req & { apiDoc: ApiDoc };
      const { name } = req.params;
      const observatory = await observatoryService.getByName(name);
      const validator = new OpenAPIResponseValidator({
        responses: apiDoc.paths["/observatory/{name}"].get.responses,
        components: apiDoc.components,
      });
      const validationError = validator.validateResponse(200, observatory);
      if (validationError)
        return res.status(503).json({
          error: "OpenAPI validation error",
          message: validationError,
          invalidResponse: observatory,
        });
      return res.status(200).json(observatory);
    },
  };
}
