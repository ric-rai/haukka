import { Operation } from "express-openapi";
import { ObservatoryService } from "../../../../services/observatory";
import { ResponseValidationError } from "../../../../error";

export default function (observatoryService: ObservatoryService): { GET: Operation } {
  return {
    GET: async (req, res, next) => {
      try {
        const { name } = req.params;
        const observatory = await observatoryService.getByName(name);
        const validationError = res.validateResponse(200, observatory);
        if (validationError) return next(new ResponseValidationError(validationError, observatory));
        return res.status(200).json(observatory);
      } catch (error) {
        return next(error);
      }
    },
  };
}
