import { NextFunction, Request, Response } from "express";
import * as AuthService from "../service/auth";
import HttpStatusCode from "http-status-codes";
import { BadRequest, NotFound } from "../error";
//login a user to generate the tokens
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const data = await AuthService.login(body);
    res.status(HttpStatusCode.OK).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new BadRequest(error.message));
    } else {
      next(new BadRequest("An unexpected error occurred"));
    }
  }
}
//get new refresh and access tokens from the previous refresh token in header
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      next(new NotFound("No Token Found"));
    } else {
      const token = authorization.split(" ");
      if (token.length != 2 || token[0] !== "Bearer") {
        next(new NotFound("No Token Found"));
      }
      const data = await AuthService.refresh(token[1]);
      res.json(data);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(new BadRequest(error.message));
    } else {
      next(new BadRequest("An unexpected error occurred"));
    }
  }
}
