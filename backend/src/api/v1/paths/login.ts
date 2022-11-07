import { Operation } from "express-openapi";
import * as jsonwebtoken from "jsonwebtoken";

const { NODE_ENV, STATIC_SERVER_PORT, TARGET } = process.env;
const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";
const host = NODE_ENV === "development" ? `http://localhost:${STATIC_SERVER_PORT}` : "";

export const GET: Operation = (req, res, next) => {
  if (req.query.token) {
    // Make HTTP request to laji to fetch user data
    return res.redirect(
      `${host}/#/?jwt=${jsonwebtoken.sign(
        {
          user: "Test",
          id: "123",
          email: "test@domain.test",
        },
        JWT_SECRET
      )}`
    );
  }
  return res.redirect(
    `https://fmnh-ws-test.it.helsinki.fi/laji-auth/login?` +
      `target=${TARGET}&redirectMethod=GET&next=`
  );
};

const token = {
  in: "query",
  name: "token",
  required: false,
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
