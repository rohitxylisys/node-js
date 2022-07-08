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
export const UserRoutes: Router = router;
