import { Request, response, Response } from "express";
import { UserUtils } from "./userUtils";
import { Constant } from "../../globals/constant";
import { GlobalUtils } from "../../helpers/globalUtils";

export class UserMiddleware {
  constructor() {}
  public signUp = async (req: any, res: Response, next: any) => {
    try {
      const response = await UserUtils.findUser({ email: req.body.email });
      if (response) {
        return res
          .status(Constant.RESPONSE_CODES.BAD_REQUEST)
          .json({ error: Constant.ERROR_MESSAGES.USER_ALREADY_EXISTENT });
      } else {
        let user = req.body;
        const hashedPassword = await GlobalUtils.encryptPassword(user.password);
        user = { ...user, password: hashedPassword };
        delete user.confirmPassword;
        req.user = user;
        next();
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: Constant.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
}
