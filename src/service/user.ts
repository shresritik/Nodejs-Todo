import { BadRequest, NotFound } from "../error";
import { IUser } from "../interface/user";
import { IQuery } from "../interface/utils";
import * as UserModel from "../model/user";
import bcrypt from "bcrypt";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("UserService");
// create a user and hash its password
export async function createUser(user: IUser) {
  if (
    !user ||
    !user.email ||
    !user.password ||
    !user.name ||
    user.email.length == 0 ||
    user.password.length == 0 ||
    user.name.length == 0 ||
    user.password.length == 0
  ) {
    throw new BadRequest("User details is not complete");
  }
  const hashPassword = await bcrypt.hash(user.password, 10);
  logger.info("create a user");
  return UserModel.createUser({ ...user, password: hashPassword });
}
export function getUsers(query: IQuery) {
  const userData = UserModel.getUsers(query) as IUser[];
  if (userData.length == 0) {
    logger.info("User Data is empty");

    return { message: "User Data is empty" };
  }
  logger.info("Get user data");
  return userData;
}
//get user by its email
export function getUserByEmail(userEmail: string) {
  const result = UserModel.getUserByEmail(userEmail);
  if (!result) throw new NotFound("No user found");
  logger.info("Get user by email");
  return result;
}
//update user by its email and hash its password
export async function updateUser(
  id: number,
  body: Pick<IUser, "email" | "name" | "password">
) {
  const hashPassword = await bcrypt.hash(body.password, 10);
  logger.info("Check user by id " + id);
  const checkUser = UserModel.getUserById(id);

  if (checkUser) {
    const result = UserModel.updateUser(id, {
      ...body,
      password: hashPassword,
    });
    logger.info("Update user by id " + id);

    return result;
  } else {
    throw new NotFound("No user found with the id " + id);
  }
}
// get user by its id
export function getUserById(id: number) {
  const result = UserModel.getUserById(id);

  if (!result) {
    throw new NotFound("No user found with the id " + id);
  }
  logger.info("Get user by id " + id);

  return result;
}
// delete user by its id
export function deleteUserById(id: number) {
  logger.info("Get user by id " + id);

  const checkUser = UserModel.getUserById(id);
  if (checkUser) {
    logger.info("Delete user by id " + id);
    UserModel.deleteUserById(id);
    return { message: "User deleted" };
  } else {
    throw new NotFound("No user found with the id " + id);
  }
}
