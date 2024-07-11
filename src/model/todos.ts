import { STATUS } from "../enum";
import { ITodo } from "../interface/todo";
import loggerWithNameSpace from "../utils/logger";
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
  console.log(data);
};
