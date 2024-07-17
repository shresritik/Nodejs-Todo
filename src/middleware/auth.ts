import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { IRequest } from "../interface/auth";
import { IUser } from "../interface/user";
import { UnauthorizedError } from "../error";
import { PERMISSION } from "../enum";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("Authentication");
//check for the authentication token in routes and verify it with jwt secret and store the response in request
export function authenticate(req: IRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError("No Token Found"));
    return;
  }
  const token = authorization.split(" ");
  if (token.length != 2 || token[0] != "Bearer") {
    next(new UnauthorizedError("No Token Found"));
    return;
  }
  try {
    const user = verify(token[1], config.jwt.secret!) as IUser;
    logger.info("authenticate " + user.name);

    req.user = user;
  } catch (error) {
    logger.error("Token failed");
    next(new UnauthorizedError("Token Failed"));
  }
  next();
}
//check permission for super-admin or user in routes
export function authorize(permission: PERMISSION) {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
      const permit = user.permissions.includes(permission);
      if (!permit) {
        next(new UnauthorizedError("Unauthorized"));
      }
      logger.info("authorize " + permit);
    } catch (error) {
      logger.error("Permission failed");

      next(new UnauthorizedError("Unauthorized"));
    }
    next();
  };
}
