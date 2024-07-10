import { Response } from "express";
import * as UserServices from "../service/todos";
import { IRequest } from "../interface/auth";
// Create a todo
export const createTodo = (req: IRequest, res: Response) => {
  const { body } = req;
  const userId = Number(req.user?.id);
  const result = UserServices.createTodo(body, userId);
  res.json(result);
};
//Read all todos
export const readAllTodos = (req: IRequest, res: Response) => {
  const userId = Number(req.user?.id);
  res.json(UserServices.getAllTodos(userId));
};
//Read a todo by id
export const readTodo = (req: IRequest, res: Response) => {
  const userId = Number(req.user?.id);
  res.json(UserServices.getTodo(req.params.id, userId));
};
//update a todo by id
export const updateTodo = (req: IRequest, res: Response) => {
  const userId = Number(req.user?.id);
  const result = UserServices.updateTodo(req.params.id, req.body, userId);
  res.json(result);
};
//Delete a todo by id
export const deleteTodo = (req: IRequest, res: Response) => {
  const userId = Number(req.user?.id);
  const result = UserServices.deleteTodo(req.params.id, userId);
  res.json(result);
};
