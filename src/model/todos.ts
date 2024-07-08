import { ITodo, STATUS } from "../interface/todo";

export const data: ITodo[] = [
  {
    id: 1,
    name: "Wash Dishes",
    status: STATUS.COMPLETE,
  },

  { id: 2, name: "Walk the dog", status: STATUS.INCOMPLETE },
];
