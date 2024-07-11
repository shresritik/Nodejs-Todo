import { NextFunction, Request, Response } from "express";
import * as AuthService from "../service/auth";
import HttpStatusCode from "http-status-codes";
import { NotFound } from "../error";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("AuthController");
//login a user to generate the tokens
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const data = await AuthService.login(body);
    logger.info("login success");
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
//get new refresh and access tokens from the previous refresh token in header
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      logger.error("No Token Found");
      next(new NotFound("No Token Found"));
    } else {
      const token = authorization.split(" ");
      if (token.length != 2 || token[0] !== "Bearer") {
        logger.error("No Token Found");
        next(new NotFound("No Token Found"));
      }
      logger.info("Refresh the token");
      const data = await AuthService.refresh(token[1]);
      res.json(data);
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
