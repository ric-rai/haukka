import { Operation } from "express-openapi";
import * as jsonwebtoken from "jsonwebtoken";

const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

export const GET: Operation = (req, res, next) => {
  res.redirect("/?token=" + jsonwebtoken.sign({ user: "test" }, JWT_SECRET));
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
    304: {
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
