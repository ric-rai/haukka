import { Operation } from "express-openapi";
import * as jsonwebtoken from "jsonwebtoken";
import { AccountService } from "../../../services/account";

const { TARGET, AUTH_DOMAIN } = process.env;
const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

export default function (accountService: AccountService): { GET: Operation } {
  return {
    GET: async (req, res, next) => {
      try {
        if (req.query.token) {
          const result = await accountService.getAccount(req.query.token as string);
          const { identity, email } = result;
          return res.redirect(`/#/?jwt=${jsonwebtoken.sign({ identity, email }, JWT_SECRET)}`);
        }

        return res.redirect(
          `${AUTH_DOMAIN}/laji-auth/login?` + `target=${TARGET}&redirectMethod=GET&next=/login`
        );
      } catch (error) {
        return next(error);
      }
    },
  };
}
