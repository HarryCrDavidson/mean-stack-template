import * as express from "express";
import { Application } from "express";
import { BaseController } from "classes/base-controller";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { Database } from "./db";

export class App {
  public app: Application;
  public port: number;
  private db = new Database("localhost", "mean-stack-template");

  constructor(port: number, controllers: BaseController[]) {
    this.app = express();
    this.port = port;
    this.app.options("*", cors());
    this.app.use(cors({ origin: "http://localhost:4200" }));
    this.app.use(bodyParser.json());

    this.routes(controllers);
    this.db.initConnection();
  }

  private routes(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`Listening on port http://localhost:${this.port}...`);
    });
  }
}
