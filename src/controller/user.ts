import { Request, Response } from "express";
import * as UserService from "../service/user";
//create a user
export async function createUser(req: Request, res: Response) {
  const { body } = req;
  const data = await UserService.createUser(body);
  res.json(data);
}
//get all users or get user from a query name
export function getUsers(req: Request, res: Response) {
  const { query } = req;
  const data = UserService.getUsers(query);
  res.json(data);
}
