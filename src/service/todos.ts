import { BadRequest, NotFound } from "../error";
import { ITodo } from "../interface/todo";
import { IQuery } from "../interface/utils";
import * as TodoModel from "../model/todos";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("TodoService");
//read all todos from the models
export const getAllTodos = async (params: IQuery, userId: number) => {
  const result = await TodoModel.TodoModel.getAllTodos(params, userId);
  const count = await TodoModel.TodoModel.count(userId);

  if (!result || result.length == 0) throw new NotFound("No data found");
  logger.info("Get all Todos");
  const meta = {
    page: params.page,
    size: result.length,
    total: +count.count,
  };
  return { ...result, meta };
};
/**
 * read a todo by id
 * @param id : string
 * @returns todo object
 */

export const getTodo = async (id: string, userId: number) => {
  const result = await TodoModel.TodoModel.getTodoById(id, userId);

  if (!result) throw new NotFound("No todo found by id " + id);
  logger.info("Get Todo by id " + id);

  return result;
};
/**
 * create a todo
 * @param todo object
 * @returns success or error if status or name is invalid
 */
export const createTodo = async (todo: ITodo, userId: number) => {
  logger.info("Create a Todo");

  return await TodoModel.TodoModel.createTodo(todo, userId);
};
/**
 * update a todo by id
 * @param id string
 * @param todo todo object
 * @returns success or error if status or id is invalid
 */
export const updateTodo = async (id: string, todo: ITodo, userId: number) => {
  const oldResult = await TodoModel.TodoModel.getTodoById(id, userId);
  if (!oldResult) throw new NotFound("No todo found by id " + id);
  logger.info("Update a Todo by id " + id);
  return await TodoModel.TodoModel.updateTodo(
    oldResult.id,
    todo,
    oldResult.userId
  );
};
/**
 * delete a todo by id
 * @param id string
 * @returns success or error if id is invalid
 */
export const deleteTodo = async (id: string, userId: number) => {
  const checkUser = await TodoModel.TodoModel.getTodoById(id, userId);
  if (!checkUser) throw new NotFound("No todo found by id " + id);
  await TodoModel.TodoModel.deleteTodo(id, userId);
  logger.info("Delete a Todo by id " + id);
  return { message: "Deleted" };
};
