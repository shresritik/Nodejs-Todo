import { STATUS } from "../enum";
import { IUser } from "./user";

export interface ITodo {
  id: number;
  name: string;
  status: STATUS;
  userId: number;
}

export interface IError {
  error: string;
}
export interface ISuccess {
  message: string;
}
