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
      await UserUtils.insertUserDetails(userDetails);
      return res
        .status(200)
        .json(
          successResponseHandler(200, Constant.SUCCESS_MESSAGES.SIGN_UP_SUCCESS)
        );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: Constant.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  public signIn = async (req: any, res: Response) => {
    const responseData = req.user;
    try {
      return res
        .status(200)
        .json(
          successResponseHandler(200, Constant.SUCCESS_MESSAGES.LOGIN_SUCCESS, [
            responseData,
          ])
        );
    } catch (error) {
      return res
        .status(500)
        .json({ error: Constant.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  public forgotPassword = async (req: any, res: Response) => {
    return res
      .status(200)
      .json(
        successResponseHandler(200, Constant.SUCCESS_MESSAGES.LOGIN_SUCCESS)
      );
  };

  public resetPassword = async (req: any, res: Response) => {
    
  };
}
