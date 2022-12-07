import { Operation } from "express-openapi";
import * as jsonwebtoken from "jsonwebtoken";
import { AccountService } from "../../../services/account";

const { TARGET, AUTH_DOMAIN } = process.env;
const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

export default function (accountService: AccountService) {
  const GET: Operation = async (req, res, next) => {
    if (req.query.token) {
      if (typeof req.query.token !== "string")
        return res.status(400).send(`Invalid query parameter 'token': ${req.query.token}`);

      const result = await accountService.getAccount(req.query.token);
      if (result === 404)
        return res.status(404).send(`Unable to find user data for ${req.query.token}`);
      if (result === 403) return res.status(403).send(`User doesn't have required role!`);
      if (result === 500) return res.status(500).send(`Internal server error!`);
      const { identity, email } = result;
      return res.redirect(`/#/?jwt=${jsonwebtoken.sign({ identity, email }, JWT_SECRET)}`);
    }

    return res.redirect(
      `${AUTH_DOMAIN}/laji-auth/login?` + `target=${TARGET}&redirectMethod=GET&next=/login`
    );
  };

  GET.apiDoc = {
    summary: "Handles login after the user has been authenticated.",
    operationId: "getAccount",
    parameters: [
      {
        in: "query",
        name: "token",
        required: false,
        schema: {
          type: "string",
        },
      },
    ],
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

  return { GET };
}
