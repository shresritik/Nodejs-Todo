import { STATUS } from "../enum";
import { ITodo } from "../interface/todo";
import { IQuery } from "../interface/utils";
import loggerWithNameSpace from "../utils/logger";
import BaseModel from "./base";
const logger = loggerWithNameSpace("TodoModel");
export let data: ITodo[] = [
  {
    id: 1,
    name: "Wash Dishes",
    status: STATUS.COMPLETE,
    userId: 1,
  },

  { id: 2, name: "Walk the dog", status: STATUS.INCOMPLETE, userId: 2 },
];
export class TodoModel extends BaseModel {
  // create todo
  static async createTodo(todo: ITodo, userId: number) {
    const statusId = await this.connection()
      .select("id")
      .table("status")
      .where("status", todo.status)
      .first();
    const data = {
      name: todo.name,
      statusId: +statusId.id,
      userId,
    };

    await this.connection().insert(data).table("todos");
    return data;
  }
  // update todo with id
  static async updateTodo(id: number, todo: ITodo, userId: number) {
    const statusId = await this.connection()
      .select("id")
      .table("status")
      .where("status", todo.status)
      .first();
    const data = {
      id: todo.id,
      name: todo.name,
      statusId: +statusId.id,
      userId,
      updatedBy: userId,
      updatedAt: new Date(),
    };

    await this.connection()
      .update(data)
      .table("todos")
      .where({ "todos.id": id });
    return data;
  }
  // get all todos and add pagination
  static getAllTodos(filter: IQuery, userId: number) {
    const { q, page, size } = filter;
    const query = this.connection()
      .select("todos.id", "todos.name", "status.status", "todos.user_id")
      .table("status")
      .join("todos", "status.id", "todos.status_id")
      .limit(size)
      .offset((page - 1) * size);
    if (q) {
      query.whereLike("name", `%${q}%`);
      return query;
    }
    query.where("user_id", userId);

    return query;
  }
  // get todo by id
  static getTodoById(id: string, userId: number) {
    return this.connection()
      .select("todos.id", "todos.name", "status.status", "todos.user_id")
      .table("status")
      .join("todos", "status.id", "todos.status_id")
      .where({ "todos.id": id, userId })
      .first();
  }
  // count all todos
  static count(userId: number) {
    return this.connection()
      .count("*")
      .table("todos")
      .where({ userId })
      .first();
  }
  // delete todo
  static deleteTodo(id: string, userId: number) {
    return this.connection()
      .delete()
      .table("todos")
      .where({ "todos.id": id, userId });
  }
}
//read all todos depending on the userId from the models
export const getAllTodos = (userId: number) => {
  logger.info("get all todos");
  if (userId != 1) {
    const result = data.filter(({ userId: userid }) => userid === userId);
    return result;
  }
  return data;
};
/**
 * read a todo by todo id and userid
 * @param id : string
 * @param userId : string
 * @returns todo object
 */

export const getTodoById = (id: string, userId: number) => {
  logger.info("get a todo by id " + id);
  const result = data.find(
    ({ id: todoId, userId: userid }) =>
      todoId === parseInt(id) && userid === userId
  );

  return result;
};
/**
 * create a todo for a user
 * @param todo object
 * @param userId number
 * @returns success or error if status or name is invalid
 */
export const createTodo = (todo: ITodo, userId: number) => {
  logger.info("create a todo");
  data.push({
    id: data.length + 1,
    name: todo.name,
    status: todo.status,
    userId,
  });
  return { message: "success" };
};
/**
 * update a todo by todo id of a userId
 * @param id string
 * @param todo object
 * @param userId number
 * @returns success or error if status or id is invalid
 */
export const updateTodo = (oldTodo: ITodo, todo: ITodo) => {
  Object.assign(oldTodo, todo);
  return { message: "success" };
};
/**
 * delete a todo by todo id of userId
 * @param id string
 * @param userId number
 * @returns success or error if id is invalid
 */
export const deleteTodo = (id: number) => {
  data = data.filter(({ id: dataId }) => dataId !== id);
};
