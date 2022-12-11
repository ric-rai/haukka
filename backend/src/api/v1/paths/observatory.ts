import { Operation } from "express-openapi";
import { ObservatoryService } from "../../../services/observatory";
import { ResponseValidationError } from "../../../error";

export default function (observatoryService: ObservatoryService): { GET: Operation } {
  return {
    GET: async (req, res, next) => {
      try {
        const observatories = await observatoryService.getAll();
        const validationError = res.validateResponse(200, observatories);
        if (validationError)
          return next(new ResponseValidationError(validationError, observatories));
        return res.status(200).json(observatories);
      } catch (error) {
        return next(error);
      }
    },
  };
}
