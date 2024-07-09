import { IUser } from "../interface/user";
import { IQuery } from "../interface/utils";
import * as UserModel from "../model/user";
import bcrypt from "bcrypt";
// create a user and hash its password
export async function createUser(user: IUser) {
  const hashPassword = await bcrypt.hash(user.password, 10);
  return UserModel.createUser({ ...user, password: hashPassword });
}
export function getUsers(query: IQuery) {
  return UserModel.getUsers(query);
}
//get user by its email
export function getUserByEmail(userEmail: string) {
  return UserModel.getUserByEmail(userEmail);
}
