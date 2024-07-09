import { STATUS } from "../enum";
import { ITodo } from "../interface/todo";
import { IError, ISuccess } from "../interface/todo";
import { isValidStatus } from "../utils";
export const data: ITodo[] = [
  {
    id: 1,
    name: "Wash Dishes",
    status: STATUS.COMPLETE,
  },

  { id: 2, name: "Walk the dog", status: STATUS.INCOMPLETE },
];

//read all todos from the models
export const getAllTodos = (): ITodo[] => {
  return data;
};
/**
 * read a todo by id
 * @param id : string
 * @returns todo object
 */

export const getTodo = (id: string): ITodo | IError => {
  const result = data.findIndex(({ id: todoId }) => todoId === parseInt(id));
  if (result == -1) return { error: "No such id found" };
  return data[result];
};
/**
 * create a todo
 * @param todo object
 * @returns success or error if status or name is invalid
 */
export const createTodo = (todo: ITodo): ISuccess | IError => {
  if (!isValidStatus(todo.status)) {
    return { error: "Status invalid" };
  }
  if (!todo.name || todo.name.length == 0) return { error: "Name invalid" };
  data.push({
    id: data.length + 1,
    name: todo.name,
    status: todo.status,
  });
  return { message: "success" };
};
/**
 * update a todo by id
 * @param id string
 * @param todo todo object
 * @returns success or error if status or id is invalid
 */
export const updateTodo = (id: string, todo: ITodo): ISuccess | IError => {
  if (todo.status && !isValidStatus(todo.status)) {
    return { error: "Status invalid" };
  }
  const result = data.findIndex(({ id: todoId }) => todoId === parseInt(id));
  if (result == -1) return { error: "No such id found" };
  data[result] = { ...data[result], ...todo };
  return { message: "success" };
};
/**
 * delete a todo by id
 * @param id string
 * @returns success or error if id is invalid
 */
export const deleteTodo = (id: string): ISuccess | IError => {
  const index = data.findIndex((obj) => obj.id === parseInt(id));
  if (index !== -1) {
    data.splice(index, 1);
    return { message: "Deleted" };
  } else {
    return { error: "No such id found" };
  }
};
