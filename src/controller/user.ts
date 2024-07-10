import { NextFunction, Request, Response } from "express";
import * as UserService from "../service/user";
import HttpStatusCode from "http-status-codes";
import { BadRequest, NotFound } from "../error";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("UserController");
//create a user
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    const data = await UserService.createUser(body);
    logger.info("create a user");
    res.status(HttpStatusCode.CREATED).json(data);
  } catch (error: any) {
    logger.error(error.message);

    next(new BadRequest(error.message));
  }
}
//get all users or get user from a query name
export function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = req;
    const data = UserService.getUsers(query);
    logger.info("get user");

    res.status(HttpStatusCode.OK).json(data);
  } catch (error: any) {
    logger.error(error.message);

    next(new NotFound(error.message));
  }
}
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { body } = req;
    const data = await UserService.updateUser(parseInt(id), body);
    logger.info("update user");

    res.status(HttpStatusCode.OK).json(data);
  } catch (error: any) {
    logger.error(error.message);

    next(new NotFound(error.message));
  }
}
export function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = UserService.getUserById(parseInt(id));
    logger.info("get user by id");

    res.status(HttpStatusCode.OK).json(data);
  } catch (error: any) {
    next(new NotFound(error.message));
  }
}
export function deleteUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = UserService.deleteUserById(parseInt(id));
    logger.info("delete user by id");

    res.status(HttpStatusCode.OK).json(data);
  } catch (error: any) {
    logger.error(error.message);

    next(new NotFound(error.message));
  }
}
