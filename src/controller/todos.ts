import { NextFunction, Response } from "express";
import * as UserServices from "../service/todos";
import { IRequest } from "../interface/auth";
import { TodoError } from "../error/TodoError";
import HttpStatusCode from "http-status-codes";
// Create a todo
export const createTodo = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const userId = Number(req.user?.id);
    const result = UserServices.createTodo(body, userId);
    res.status(HttpStatusCode.CREATED).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      next(new TodoError(error.message));
    } else {
      next(new TodoError("An unexpected error occurred"));
    }
  }
};
//Read all todos
export const readAllTodos = (req: IRequest, res: Response) => {
  const userId = Number(req.user?.id);
  res.status(HttpStatusCode.OK).json(UserServices.getAllTodos(userId));
};
//Read a todo by id
export const readTodo = (req: IRequest, res: Response) => {
  const userId = Number(req.user?.id);
  res
    .status(HttpStatusCode.OK)
    .json(UserServices.getTodo(req.params.id, userId));
};
//update a todo by id
export const updateTodo = (req: IRequest, res: Response) => {
  const userId = Number(req.user?.id);
  const result = UserServices.updateTodo(req.params.id, req.body, userId);
  res.status(HttpStatusCode.OK).json(result);
};
//Delete a todo by id
export const deleteTodo = (req: IRequest, res: Response) => {
  const userId = Number(req.user?.id);
  const result = UserServices.deleteTodo(req.params.id, userId);
  res.status(HttpStatusCode.OK).json(result);
};
