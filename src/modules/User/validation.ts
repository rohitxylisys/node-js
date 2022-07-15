const { check, validationResult } = require("express-validator");
import { Response, Request } from "express";
import { Constant } from "../../globals/constant";

export class Validation {
  public static userSignUpValidationSchema = () => {
    return [
      check("firstName", "firstName is Requiered")
        .not()
        .isEmpty()
        .withMessage("firstName required")
        .bail()
        .isString()
        .withMessage("firstName must be a String")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Minimum 3 characters required!"),
      check("lastName", "lastName is Requiered")
        .custom(async (value: any) => {
          if (value.trim().length !== value.length) {
            throw new Error("please remove unwanted space from start and end");
          }
        })
        .not()
        .isEmpty()
        .withMessage("lastName required")
        .bail()
        .isString()
        .withMessage("lastName must be a String")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Minimum 3 characters required!"),
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email can not be empty!")
        .bail()
        .normalizeEmail()
        .toLowerCase()
        .isEmail()
        .withMessage("Invalid email address!"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("password required")
        .bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage(
          "password must be at least 8 characters with 1 upper case letter and 1 number"
        ),

      check("confirmPassword")
        .custom(async (value: any, { req }: any) => {
          const password = await req.body.password;
          if (password !== value) {
            throw new Error("password and confirmPassword must be same");
          }
        })
        .not()
        .isEmpty()
        .withMessage("confirmPassword required"),
    ];
  };

  public static userLoginValidationShema() {
    return [
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required!")
        .bail()
        .normalizeEmail()
        .toLowerCase()
        .isEmail()
        .withMessage("Invalid email address!"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("password required")
        .bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage(
          "password must be at least 8 characters with 1 upper case letter and 1 number"
        ),
    ];
  }

  public static userForgotPasswordValidationShema() {
    return [
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email is required!")
        .bail()
        .normalizeEmail()
        .toLowerCase()
        .isEmail()
        .withMessage("Invalid email address!"),
    ];
  }

  public static userResetPasswordValidationShema() {
    return [
      check("password")
        .not()
        .isEmpty()
        .withMessage("password required")
        .bail()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
        .withMessage(
          "password must be at least 8 characters with 1 upper case letter and 1 number"
        ),

      check("confirmPassword")
        .custom(async (value: any, { req }: any) => {
          const password = await req.body.password;
          if (password !== value) {
            throw new Error("password and confirmPassword must be same");
          }
        })
        .not()
        .isEmpty()
        .withMessage("confirmPassword required"),
    ];
  }

  public static checkValidation = async (
    req: Request,
    res: Response,
    next: any
  ) => {
    try {
      const user: any = await validationResult(req);
      if (user && user.errors.length) {
        let validationErrors = [];
        let obj: any = {};
        for (const error of user.errors) {
          obj[error.param] = error.msg;
        }
        validationErrors.push(obj);
        return res.status(400).json({ error: validationErrors });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: Constant.ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  };
}
