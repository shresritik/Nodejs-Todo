import { BadRequest, NotFound } from "../error";
import { IUser } from "../interface/user";
import { IQuery } from "../interface/utils";
import * as UserModel from "../model/user";
import bcrypt from "bcrypt";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("UserService");
// create a user and hash its password
export async function createUser(createdBy: number, user: IUser) {
  const hashPassword = await bcrypt.hash(user.password, 10);
  logger.info("create a user");
  const userId = await UserModel.UserModel.getUserByEmail(user.email);
  if (userId.length > 0) {
    throw new BadRequest("User with email already exist");
  }
  const response = await UserModel.UserModel.createUser(createdBy, {
    ...user,
    password: hashPassword,
  });
  return response;
}
export async function getUsers(query: IQuery) {
  const userData = await UserModel.UserModel.getUsers(query);
  const count = await UserModel.UserModel.count(query);
  if (userData.length == 0) {
    logger.info("User Data is empty");

    return { message: "User Data is empty" };
  }

  logger.info("Get user data");
  const meta = {
    page: query.page,
    size: userData.length,
    total: +count.count,
  };
  return { ...userData, meta };
}
//get user by its email
export async function getUserByEmail(userEmail: string) {
  const result = await UserModel.UserModel.getUserByEmail(userEmail);
  if (!result || result.length == 0) throw new NotFound("No user found");
  logger.info("Get user by email");
  return result;
}
//update user by its email and hash its password
export async function updateUser(
  updatedBy: number,
  id: number,
  body: Pick<IUser, "email" | "name" | "password" | "id">
) {
  const hashPassword = await bcrypt.hash(body.password, 10);
  logger.info("Check user by id " + id);
  const oldUser = await UserModel.UserModel.getUserById(id);
  if (oldUser) {
    const result = await UserModel.UserModel.updateUser(updatedBy, oldUser, {
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
export async function getUserById(id: number) {
  const result = await UserModel.UserModel.getUserById(id);
  if (!result) {
    throw new NotFound("No user found with the id " + id);
  }
  logger.info("Get user by id " + id);

  return result;
}
// delete user by its id
export async function deleteUserById(id: number) {
  logger.info("Get user by id " + id);

  const checkUser = await UserModel.UserModel.getUserById(id);
  if (checkUser) {
    logger.info("Delete user by id " + id);
    await UserModel.UserModel.deleteUserById(checkUser.id);
    return { message: "User deleted" };
  } else {
    throw new NotFound("No user found with the id " + id);
  }
}
