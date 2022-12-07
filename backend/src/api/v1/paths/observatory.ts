import { Operation } from "express-openapi";
import { ObservatoryService } from "../../../services/observatory";

export default function (observatoryService: ObservatoryService) {
  const GET: Operation = async (req, res, next) => {
    const observatories = await observatoryService.getAll();
    return res.status(200).json(observatories);
  };

  GET.apiDoc = {
    summary: "All observatories",
    parameters: [],
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json:": {},
        },
      },
    },
  };

  return { GET };
}
