import { IUser } from "./user";
import { Request } from "express";
export interface IRequest extends Request {
  user?: IUser;
}
