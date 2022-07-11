const { check, validationResult } = require("express-validator");
import { Response, Request } from "express";

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
      check("email")
        .not()
        .isEmpty()
        .withMessage("Email can not be empty!")
        .bail()
        .normalizeEmail()
        .toLowerCase()
        .isEmail()
        .withMessage("Invalid email address!"),
    ];
  };

  public static checkValidation = async (
    req: Request,
    res: Response,
    next: any
  ) => {
    try {
      const result = await validationResult(req);
      if (result && result.errors.length) {
        let validationErrors = [];
        let obj: any = {};
        for (const error of result.errors) {
          obj[error.param] = error.msg;
        }
        validationErrors.push(obj);
        return res.status(400).json({ error: validationErrors });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
    }
  };
}
