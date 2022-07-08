import { Request, Response } from "express";
import { successResponseHandler } from "../../helpers/responseUtils";
import { Constant } from "../../globals/constant";

export class UserController {
  constructor() {}

  public signUp(req: Request, res: Response) {
    try {
      console.log(req.body);
      return res
        .status(200)
        .json(
          successResponseHandler(
            200,
            Constant.SUCCESS_MESSAGES.SIGN_UP_SUCCESS,
            [req.body]
          )
        );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: Constant.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }
}
