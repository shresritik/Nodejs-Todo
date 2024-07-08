import { ITodo, STATUS } from "../interface/todo";
import { data } from "../model/todos";
import { isValidStatus } from "../utils/utils";

export const getAllTodos = () => {
  return data;
};
export const getTodo = (id: string) => {
  return data.find(({ id: todoId }) => todoId === parseInt(id)) as ITodo;
};
export const createTodo = (todo: ITodo) => {
  if (!isValidStatus(todo.status)) {
    return { error: "Status invalid" };
  }
  data.push({
    id: data.length + 1,
    name: todo.name,
    status: todo.status,
  });
  return { message: "success" };
};
export const updateTodo = (id: string, todo: ITodo) => {
  if (!isValidStatus(todo.status)) {
    return { error: "Status invalid" };
  }
  const result = data.find(
    ({ id: todoId }) => todoId === parseInt(id)
  ) as ITodo;
  result.name = todo.name;
  result.status = todo.status;
  return { message: "success" };
};
export const deleteTodo = (id: string) => {
  const index = data.findIndex((obj) => obj.id === parseInt(id));
  if (index !== -1) {
    data.splice(index, 1);
    return { message: "Deleted" };
  } else {
    return { error: "No such id found" };
  }
};
