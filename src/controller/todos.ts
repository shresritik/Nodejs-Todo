import { NextFunction, Response } from "express";
import * as UserServices from "../service/todos";
import { IRequest } from "../interface/auth";
import HttpStatusCode from "http-status-codes";
import { BadRequest, NotFound } from "../error";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("TodoController");
// Create a todo
export const createTodo = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const userId = Number(req.user?.id);
    console.log(req.user);
    const result = UserServices.createTodo(body, userId);
    logger.info("create a todo");
    res.status(HttpStatusCode.CREATED).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(error.message);

      next(new BadRequest(error.message));
    } else {
      logger.error("An unexpected error occurred");
      next(new BadRequest("An unexpected error occurred"));
    }
  }
};
//Read all todos
export const readAllTodos = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const result = UserServices.getAllTodos(userId);
    logger.info("get all todos");
    res.status(HttpStatusCode.OK).json(result);
  } catch (error: any) {
    logger.error(error.message);

    next(new NotFound(error.message));
  }
};
//Read a todo by id
export const readTodo = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.user?.id);
    const result = UserServices.getTodo(req.params.id, userId);
    logger.info("get a todo by id " + userId);

    res.status(HttpStatusCode.OK).json(result);
  } catch (error: any) {
    logger.error(error.message);

    next(new NotFound(error.message));
  }
};
//update a todo by id
export const updateTodo = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const result = UserServices.updateTodo(req.params.id, req.body, userId);
    logger.info("update a todo by id " + userId);

    res.status(HttpStatusCode.OK).json(result);
  } catch (error: any) {
    if (error.message == "Status invalid") next(new BadRequest(error.message));
    next(new NotFound(error.message));
  }
};
//Delete a todo by id
export const deleteTodo = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const result = UserServices.deleteTodo(req.params.id, userId);
    logger.info("delete a todo by id " + userId);

    res.status(HttpStatusCode.OK).json(result);
  } catch (error: any) {
    next(new NotFound(error.message));
  }
};
