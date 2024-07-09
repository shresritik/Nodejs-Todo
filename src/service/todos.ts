import { IError, ISuccess, ITodo } from "../interface/todo";
import * as TodoModel from "../model/todos";
//read all todos from the models
export const getAllTodos = (): ITodo[] => {
  return TodoModel.getAllTodos();
};
/**
 * read a todo by id
 * @param id : string
 * @returns todo object
 */

export const getTodo = (id: string): ITodo | IError => {
  return TodoModel.getTodo(id);
};
/**
 * create a todo
 * @param todo object
 * @returns success or error if status or name is invalid
 */
export const createTodo = (todo: ITodo): ISuccess | IError => {
  return TodoModel.createTodo(todo);
};
/**
 * update a todo by id
 * @param id string
 * @param todo todo object
 * @returns success or error if status or id is invalid
 */
export const updateTodo = (id: string, todo: ITodo): ISuccess | IError => {
  return TodoModel.updateTodo(id, todo);
};
/**
 * delete a todo by id
 * @param id string
 * @returns success or error if id is invalid
 */
export const deleteTodo = (id: string): ISuccess | IError => {
  return TodoModel.deleteTodo(id);
};
