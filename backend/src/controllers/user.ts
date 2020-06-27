import { Request, Response } from "express";
import { BaseController } from "../classes/base-controller";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";

export class UserController extends BaseController {
  private repo = new UserRepository();
  saltRounds = 12;

  constructor() {
    super();
  }

  public initRoutes() {
    // routes used to access user backend calls
    this.router.get("/getAllUsers", (req, res) => this.getAll(req, res));
    this.router.get("/getUserById", (req, res) => this.getUserById(req, res));
    this.router.post("/login", (req, res) => this.login(req, res));
    this.router.post("/registerUser", (req, res) => this.addUser(req, res));
    this.router.post("/deleteUserById", (req, res) =>
      this.deleteUserById(req, res)
    );
    this.router.get("/getUserByUsername", (req, res) =>
      this.getUserByUsername(req, res)
    );
    // this.router.post("/editUserRole", (req, res) => {
    //   this.editUserRole(req, res);
    // });
  }

  async getAll(req: Request, res: Response) {
    const userDoc = await this.repo.findAll();
    res.json(userDoc);
  }

  async login(req: Request, res: Response) {
    // gets user from backend by username
    const userDoc = await this.repo.findByExactUsername(req.body.username);
    if (!userDoc) {
      return res.sendStatus(403);
    }
    // compare plaintext password submitted by user to encrypted password from user document
    bcrypt.compare(req.body.password, userDoc["password"], (err, isMatch) => {
      if (!isMatch) {
        return res.sendStatus(403);
      }
      // generate token to send back to user
      const token = jwt.sign({ user: userDoc }, process.env.SECRET_TOKEN);
      res.status(200).json({ token: token });
    });
  }

  async getUserById(req: Request, res: Response) {
    const userDoc = await this.repo.findByUserId(req.query.userId);
    res.json(userDoc);
  }

  async getUserByUsername(req: Request, res: Response) {
    const userDoc = await this.repo.findByUsername(req.query.username);
    res.json(userDoc);
  }

  async addUser(req: Request, res: Response) {
    // generate salt for encryption
    console.log("in add user");
    bcrypt.genSalt(this.saltRounds, (errorSalt, salt) => {
      // hash plaintext password using salt generated on line above
      bcrypt.hash(req.body.password, salt, async (errorHash, hash) => {
        let user;
        user = {
          username: req.body.username,
          password: hash,
          email: req.body.email,
        };
        try {
          const userDoc = await this.repo.create(user);
          res.json(userDoc);
        } catch {
          res.status(500).json();
        }
      });
    });
  }

  async deleteUserById(req: Request, res: Response) {
    // call repo to delete user
    const userDoc = await this.repo.deleteByUserId(req.body.userId);
    res.json(userDoc);
  }

  //   async editUserRole(req: Request, res: Response) {
  //     // user repo to edit user role (only one field)
  //     const userDoc = await this.repo.editUserRole(req.body);
  //     res.json(userDoc);
  //   }
}
