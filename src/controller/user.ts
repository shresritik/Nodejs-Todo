import { Request, Response } from "express";
import * as UserService from "../service/user";

export function createUser(req: Request, res: Response) {
  const { body } = req;
  UserService.createUser(body);
  res.json("User created");
}
export function getUsers(req: Request, res: Response) {
  const data = UserService.getUsers();
  res.json(data);
}
