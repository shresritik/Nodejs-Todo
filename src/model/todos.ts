import { STATUS } from "../enum";
import { ITodo } from "../interface/todo";
import { isValidStatus } from "../utils";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("TodoModel");
export const data: ITodo[] = [
  {
    id: 1,
    name: "Wash Dishes",
    status: STATUS.COMPLETE,
    userId: 1,
  },

  { id: 2, name: "Walk the dog", status: STATUS.INCOMPLETE, userId: 2 },
];

//read all todos depending on the userId from the models
export const getAllTodos = (userId: number) => {
  logger.info("get all todos");

  if (userId != 1) {
    const result = data.filter(({ userId: userid }) => userid === userId);
    if (!result || result.length == 0) throw new Error("No data found");
    return result;
  }

  if (data.length == 0) throw new Error("No data found");
  return data;
};
/**
 * read a todo by todo id and userid
 * @param id : string
 * @param userId : string
 * @returns todo object
 */

export const getTodo = (id: string, userId: number) => {
  logger.info("get a todo by id " + id);
  const result = data.findIndex(
    ({ id: todoId, userId: userid }) =>
      todoId === parseInt(id) && userid === userId
  );

  if (result == -1) throw new Error("No such id found");
  return data[result];
};
/**
 * create a todo for a user
 * @param todo object
 * @param userId number
 * @returns success or error if status or name is invalid
 */
export const createTodo = (todo: ITodo, userId: number) => {
  logger.info("create a todo");
  if (!isValidStatus(todo.status)) {
    throw new Error("Status invalid");
  }
  if (!todo.name || todo.name.length == 0) {
    throw new Error("Name invalid");
  }
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
export const updateTodo = (id: string, todo: ITodo, userId: number) => {
  logger.info("update a todo by id " + id);
  if (todo.status && !isValidStatus(todo.status)) {
    throw new Error("Status invalid");
  }
  const result = data.findIndex(
    ({ id: todoId, userId: userid }) =>
      todoId === parseInt(id) && userid === userId
  );
  if (result == -1) throw new Error("No such id found");
  data[result] = { ...data[result], ...todo, userId };
  return { message: "success" };
};
/**
 * delete a todo by todo id of userId
 * @param id string
 * @param userId number
 * @returns success or error if id is invalid
 */
export const deleteTodo = (id: string, userId: number) => {
  logger.info("Delete a todo by id " + id);
  const index = data.findIndex(
    ({ id: todoId, userId: userid }) =>
      todoId === parseInt(id) && userid === userId
  );
  if (index !== -1) {
    data.splice(index, 1);
    return { message: "Deleted" };
  } else {
    throw new Error("No such id found");
  }
};
