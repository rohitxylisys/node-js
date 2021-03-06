import express from "express";
import * as dotenv from "dotenv";
import { Routes } from "./routes";
import * as bodyParser from "body-parser";
import { DbConnection } from "./config/dbConnection";

export class App {
  protected app: express.Application;
  constructor() {
    dotenv.config({});
    const PORT = process.env.SERVER_PORT || 3000;
    const routes = new Routes();
    this.app = express();
    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid,x-auth-token,X-L10N-Locale"
      );
      res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(
      bodyParser.json(),
      (error: any, req: any, res: any, next: any) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error: "Invalid request body" });
        }
        next();
      }
    );

    const database = new DbConnection();
    database.connect();
    this.app.use("/api/v1", routes.path());
    this.app.listen(PORT, () => {
      console.log(`server listening on port ----> ${PORT}`);
    });
  }
}
