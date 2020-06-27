import { App } from "./app";
import { UserController } from "./controllers/user";
import * as dotenv from "dotenv";

const app = new App(8080, [new UserController()]);
dotenv.config({ path: ".env" });
app.start();
