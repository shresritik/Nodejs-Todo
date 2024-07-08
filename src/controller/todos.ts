import { Request, Response } from "express";
import * as UserServices from "../service/todos";
export const readAllTodos = (req: Request, res: Response) => {
  res.json(UserServices.getAllTodos());
};
export const readTodo = (req: Request, res: Response) => {
  res.json(UserServices.getTodo(req.params.id));
};
export const createTodo = (req: Request, res: Response) => {
  const { body } = req;
  const result = UserServices.createTodo(body);
  res.json(result);
};
export const updateTodo = (req: Request, res: Response) => {
  const result = UserServices.updateTodo(req.params.id, req.body);
  res.json(result);
};
export const deleteTodo = (req: Request, res: Response) => {
  const result = UserServices.deleteTodo(req.params.id);
  res.json(result);
};
