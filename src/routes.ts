import express = require("express");
import { UserRoutes } from "./modules/User/userRoutes";

export class Routes {
  constructor() {}

  public path() {
    const router = express.Router();
    router.use("/user", UserRoutes);
    return router;
  }
}
