import { Operation } from "express-openapi";
import { DayService } from "../../../../../services/day";
import { ResponseValidationError } from "../../../../../error";
import { Response as ExpressResponse } from "express";

export default function (dayService: DayService): { POST: Operation } {
  return {
    POST: async (req, res, next) => {
      try {
        const { body } = req;
        console.log(body);
        const day = await dayService.new(body);
        //const validationError = res.validateResponse(200, day);
        //console.log(validationError);
        //if (validationError) return next(new ResponseValidationError(validationError, day));
        return res.status(200).json(day);
      } catch (error) {
        return next(error);
      }
    },
  };
}
