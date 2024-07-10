import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import { IRequest } from "../interface/auth";
import { IUser } from "../interface/user";
import { UnauthorizedError } from "../error/UnauthorizedError";
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
    req.user = user;
  } catch (error) {
    next(new UnauthorizedError("Token Failed"));
  }
  next();
}
export function authorize(permission: string | string[]) {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    try {
      if (typeof permission == "string") {
        if (!user?.permissions.includes(permission)) {
          next(new UnauthorizedError("Unauthorized"));
        }
      } else if (typeof permission == "object") {
        if (permission.findIndex((p) => user?.permissions.includes(p)) == -1) {
          console.log("here");
          next(new UnauthorizedError("Unauthorized"));
        }
      }
    } catch (error) {
      next(new UnauthorizedError("Unauthorized"));
    }
    next();
  };
}
