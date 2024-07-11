import { BadRequest, NotFound } from "../error";
import { ITodo } from "../interface/todo";
import * as TodoModel from "../model/todos";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("TodoService");
//read all todos from the models
export const getAllTodos = (userId: number) => {
  const result = TodoModel.getAllTodos(userId);
  if (!result || result.length == 0) throw new NotFound("No data found");
  logger.info("Get all Todos");
  return result;
};
/**
 * read a todo by id
 * @param id : string
 * @returns todo object
 */

export const getTodo = (id: string, userId: number) => {
  const result = TodoModel.getTodoById(id, userId);
  if (!result) throw new NotFound("No todo found by id " + id);
  logger.info("Get Todo by id " + id);

  return result;
};
/**
 * create a todo
 * @param todo object
 * @returns success or error if status or name is invalid
 */
export const createTodo = (todo: ITodo, userId: number) => {
  logger.info("Create a Todo");
  return TodoModel.createTodo(todo, userId);
};
/**
 * update a todo by id
 * @param id string
 * @param todo todo object
 * @returns success or error if status or id is invalid
 */
export const updateTodo = (id: string, todo: ITodo, userId: number) => {
  const oldResult = TodoModel.getTodoById(id, userId);
  if (!oldResult) throw new NotFound("No todo found by id " + id);
  logger.info("Update a Todo by id " + id);
  return TodoModel.updateTodo(oldResult, todo);
};
/**
 * delete a todo by id
 * @param id string
 * @returns success or error if id is invalid
 */
export const deleteTodo = (id: string, userId: number) => {
  const checkUser = TodoModel.getTodoById(id, userId);
  if (!checkUser) throw new NotFound("No todo found by id " + id);
  TodoModel.deleteTodo(checkUser.id);
  logger.info("Delete a Todo by id " + id);
  return { message: "Deleted" };
};
