import { Request, response, Response } from "express";
import { successResponseHandler } from "../../helpers/responseUtils";
import { Constant } from "../../globals/constant";
import { Result } from "express-validator";
const { UserUtils } = require("./userUtils");
export class UserController {
  constructor() {}

  public signUp = async (req: any, res: Response) => {
    try {
      const userDetails = req.user;
      await UserUtils.createUser(userDetails);

      return res
        .status(200)
        .json(
          successResponseHandler(200, Constant.SUCCESS_MESSAGES.SIGN_UP_SUCCESS)
        );
    } catch (error) {
      return res
        .status(500)
        .json({ error: Constant.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
}
