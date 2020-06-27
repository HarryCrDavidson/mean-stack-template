import * as express from "express";

export abstract class BaseController {
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }
  public initRoutes() {}
}
