import { STATUS } from "../enum";

export interface ITodo {
  id: number;
  name: string;
  status: STATUS;
  userId: number;
}
