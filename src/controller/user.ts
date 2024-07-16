import { NextFunction, Request, Response } from "express";
import * as UserService from "../service/user";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { IRequest } from "../interface/auth";
const logger = loggerWithNameSpace("UserController");
//create a user
export async function createUser(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, user } = req;
    const data = await UserService.createUser(user.id, body);
    logger.info("create a user");
    res.status(HttpStatusCode.CREATED).json(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
//get all users or get user from a query name
export async function getUsers(req: Request, res: Response) {
  const { query } = req;
  const data = await UserService.getUsers(query);
  logger.info("get user");
  res.status(HttpStatusCode.OK).json(data);
}
// update user by id
export async function updateUser(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { body, user } = req;
    const data = await UserService.updateUser(user.id, parseInt(id), body);
    logger.info("update user");

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
// get user by id
export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await UserService.getUserById(parseInt(id));
    logger.info("get user by id");

    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
// delete user by id
export async function deleteUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await UserService.deleteUserById(parseInt(id));
    logger.info("delete user by id");
    res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
