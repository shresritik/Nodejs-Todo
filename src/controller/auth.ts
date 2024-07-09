import { Request, Response } from "express";
import * as AuthService from "../service/auth";
export async function login(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.login(body);
  console.log(data);
  res.json(data);
}
export async function refresh(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.refresh(body.refreshToken);
  console.log(data);
  res.json(data);
}
