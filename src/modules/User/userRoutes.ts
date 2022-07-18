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
  Validation.checkValidation,
  userMiddleware.forgotPassword,
  userController.forgotPassword
);

router.post(
  "/reset-password/:link",
  Validation.userResetPasswordValidationShema(),
  Validation.checkValidation,
  userMiddleware.resetPassword,
  userController.resetPassword
);

router.get("/verify-link/:link", userController.verifyEmailLink);

export const UserRoutes: Router = router;
