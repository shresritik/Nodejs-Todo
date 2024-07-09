import { Request, Response } from "express";
import * as AuthService from "../service/auth";
//login a user to generate the tokens
export async function login(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.login(body);
  res.json(data);
}
//get new refresh and access tokens from the previous refresh token in header
export async function refresh(req: Request, res: Response) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.json({ error: "No token found" });
  } else {
    const token = authorization.split(" ");
    if (token.length != 2 || token[0] !== "Bearer") {
      res.json({ error: "No token found" });
    }
    const data = await AuthService.refresh(token[1]);
    res.json(data);
  }
}
