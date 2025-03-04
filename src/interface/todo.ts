import { STATUS } from "../enum";

export interface ITodo {
  id: number;
  name: string;
  status: STATUS;
}

export interface IError {
  error: string;
}
export interface ISuccess {
  message: string;
}
