const { check, validationResult } = require("express-validator");
import { Response, Request } from "express";

export class Validation {
  public static userSignUpValidationSchema = () => {
    return [
      check("firstName")
        .exists()
        .withMessage("firstName is Requiered")
        .isString()
        .withMessage("firstName must be a String")
        .isLength({ min: 3 })
        .withMessage("Minimum 3 characters required!"),
      check("email")
        .isEmpty()
        .withMessage("Email can not be empty!")
        .normalizeEmail()
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
      console.log(result, "result");

      if (result && result.errors.length) {
        let validationErrors = [];
        let obj: any = {};
        for (const error of result.errors) {
          obj[error.param] = error.msg;
        }
        validationErrors.push(obj);
        return res.status(400).json({ error: validationResult });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
    }
  };
}
