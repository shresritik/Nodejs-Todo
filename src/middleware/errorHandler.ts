import { NextFunction, Response } from "express";
import { IRequest } from "../interface/auth";
import HttpStatusCode from "http-status-codes";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { TodoError } from "../error/TodoError";
export function notFound(req: IRequest, res: Response) {
  return res.status(HttpStatusCode.NOT_FOUND).json({ message: "Not Found" });
}
export function genericErrorHandler(
  error: Error,
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  if (error instanceof UnauthorizedError) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ error: error.message });
  }
  if (error instanceof TodoError) {
    return res.status(HttpStatusCode.FORBIDDEN).json({ error: error.message });
  }
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
}
