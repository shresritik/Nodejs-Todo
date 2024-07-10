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
export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;
  const data = await UserService.updateUser(parseInt(id), body);
  res.json(data);
}
export function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const data = UserService.getUserById(parseInt(id));
  res.json(data);
}
export function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;
  const data = UserService.deleteUserById(parseInt(id));
  res.json(data);
}
