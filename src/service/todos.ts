import { ITodo } from "../interface/todo";
import * as TodoModel from "../model/todos";
//read all todos from the models
export const getAllTodos = (userId: number) => {
  return TodoModel.getAllTodos(userId);
};
/**
 * read a todo by id
 * @param id : string
 * @returns todo object
 */

export const getTodo = (id: string, userId: number) => {
  return TodoModel.getTodo(id, userId);
};
/**
 * create a todo
 * @param todo object
 * @returns success or error if status or name is invalid
 */
export const createTodo = (todo: ITodo, userId: number) => {
  return TodoModel.createTodo(todo, userId);
};
/**
 * update a todo by id
 * @param id string
 * @param todo todo object
 * @returns success or error if status or id is invalid
 */
export const updateTodo = (id: string, todo: ITodo, userId: number) => {
  return TodoModel.updateTodo(id, todo, userId);
};
/**
 * delete a todo by id
 * @param id string
 * @returns success or error if id is invalid
 */
export const deleteTodo = (id: string, userId: number) => {
  return TodoModel.deleteTodo(id, userId);
};
