import { Response } from "express";
import { UserUtils } from "./userUtils";
import { Constant } from "../../globals/constant";
import { GlobalUtils } from "../../helpers/globalUtils";

export class UserMiddleware {
  constructor() {}
  public signUp = async (req: any, res: Response, next: any) => {
    try {
      const userIsExist = await UserUtils.findUser({ email: req.body.email });
      if (userIsExist) {
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
        .status(Constant.RESPONSE_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: Constant.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  public signIn = async (req: any, res: Response, next: any) => {
    try {
      let userIsExist = await UserUtils.findUser({ email: req.body.email });
      if (!userIsExist) {
        return res
          .status(Constant.RESPONSE_CODES.NOT_FOUND)
          .json({ error: Constant.ERROR_MESSAGES.USER_NOT_FOUND });
      } else {
        const checkPassword = await GlobalUtils.comparePassword(
          userIsExist.password
        );
        if (!checkPassword) {
          return res
            .status(Constant.RESPONSE_CODES.BAD_REQUEST)
            .json({ error: Constant.ERROR_MESSAGES.PASSWORD_WRONG });
        }
        const userToken = await GlobalUtils.generateToken(userIsExist);
        userIsExist.token = userToken;
        await UserUtils.updateDetails(
          { token: userToken },
          { email: req.body.email }
        );
        const emailData = {
          to: `${userIsExist.email}`,
          subject: "Login Successfully",
          html: `<h1>Welcome</h1> ${userIsExist.firstName} ${userIsExist.lastName} </br>`,
        };
        GlobalUtils.sendMail(emailData);
        req.user = userIsExist;
        next();
      }
    } catch (error) {
      return res
        .status(Constant.RESPONSE_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: Constant.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };

  public forgotPassword = async (req: any, res: Response, next: any) => {
    try {
      let userIsExist = await UserUtils.findUser({ email: req.body.email });
      if (!userIsExist) {
        return res
          .status(Constant.RESPONSE_CODES.NOT_FOUND)
          .json({ error: Constant.ERROR_MESSAGES.USER_NOT_FOUND });
      } else {
        const linkToken = await GlobalUtils.generateToken(userIsExist.id);
        const resetPasswordLink = `${process.env.DEFAULT_URL}/user/verify-link/${linkToken}`;

        const emailData = {
          to: req.body.email,
          subject: "User Forgot Password",
          html: `<h1>Click on link for reset password</h1></br><h4>Link:</h4> <a href="${resetPasswordLink}">Reset Password</a>`,
        };

        GlobalUtils.sendMail(emailData);
        next();
      }

      next();
    } catch (error) {
      return res
        .status(Constant.RESPONSE_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: Constant.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
}
