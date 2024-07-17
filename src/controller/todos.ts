import { NextFunction, Response } from "express";
import * as UserServices from "../service/todos";
import { IRequest } from "../interface/auth";
import HttpStatusCode from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("TodoController");
// Create a todo
export const createTodo = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const userId = Number(req.user?.id);
    const result = await UserServices.createTodo(body, userId);
    logger.info("create a todo");
    res.status(HttpStatusCode.CREATED).json(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
//Read all todos
export const readAllTodos = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const { query } = req;
    const result = await UserServices.getAllTodos(query, userId);
    logger.info("get all todos");
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
//Read a todo by id
export const readTodo = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const result = await UserServices.getTodo(req.params.id, userId);
    logger.info("get a todo by id " + userId);

    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
//update a todo by id
export const updateTodo = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const result = await UserServices.updateTodo(
      req.params.id,
      req.body,
      userId
    );
    logger.info("update a todo by id " + userId);

    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
//Delete a todo by id
export const deleteTodo = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.user?.id);
    const result = await UserServices.deleteTodo(req.params.id, userId);
    logger.info("delete a todo by id " + userId);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
