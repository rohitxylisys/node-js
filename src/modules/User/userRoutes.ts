import { Router } from "express";
import { UserMiddleware } from "./userMiddleware";
import { UserController } from "./userController";
import { Validation } from "./validation";

const router: Router = Router();
const userController = new UserController();
const userMiddleware = new UserMiddleware();
router.post(
  "/sign-up",
  Validation.userSignUpValidationSchema(),
  Validation.checkValidation,
  userMiddleware.signUp,
  userController.signUp
);

router.post(
  "/sign-in",
  Validation.userLoginValidationShema(),
  Validation.checkValidation,
  userMiddleware.signIn,
  userController.signIn
);

router.post(
  "/forgot-password",
  Validation.userForgotPasswordValidationShema(),
  userMiddleware.forgotPassword,
  userController.forgotPassword
);
export const UserRoutes: Router = router;
