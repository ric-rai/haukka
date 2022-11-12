import { Operation } from "express-openapi";
import { locations } from "../../../locations";

export const GET: Operation = async (req, res, next) => {
  return res.status(200).json(JSON.stringify(locations));
};

GET.apiDoc = {
  summary: "Definitions for locations",
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
