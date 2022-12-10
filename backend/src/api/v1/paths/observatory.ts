import { Operation } from "express-openapi";
import { ObservatoryService } from "../../../services/observatory";

export default function (observatoryService: ObservatoryService): { GET: Operation } {
  return {
    GET: async (req, res, next) => {
      const observatories = await observatoryService.getAll();
      return res.status(200).json(observatories);
    },
  };
}
