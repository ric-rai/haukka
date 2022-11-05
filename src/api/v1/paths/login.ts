import { Operation } from "express-openapi";

export const GET: Operation = (req, res, next) => {
  res.status(200).send("success");
};

const token = {
  in: "query",
  name: "token",
  required: true,
  schema: {
    type: "string",
  },
};

GET.apiDoc = {
  summary: "Handles login after the user has been authenticated.",
  operationId: "login",
  parameters: [token],
  responses: {
    200: {
      description: "Redirect to the root.",
      content: {
        "text/plain": {
          schema: {
            type: "string",
          },
        },
      },
    },
  },
};
