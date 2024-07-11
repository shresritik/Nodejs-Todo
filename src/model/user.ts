import config from "../config";
import { ROLE } from "../enum";
import { IUser } from "../interface/user";
import { IQuery } from "../interface/utils";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("UserModel");
export let userData: IUser[] = [
  {
    id: 1,
    name: "shyam",
    email: "shyam@dsa.com",
    password: config.password!,
    permissions: [ROLE.ADMIN],
  },
];
/**
 * push the user in the array
 * @param user
 */
export function createUser(user: IUser) {
  logger.info("create a user");
  const data = {
    id: userData.length + 1,
    name: user.name,
    password: user.password,
    email: user.email,
    permissions: [ROLE.USER],
  };
  userData.push(data);
  return data;
}
/**
 * get all the users or a user based on the query
 * @param query name of the user to retrieve
 * @returns user
 */
export function getUsers(query: IQuery) {
  logger.info("get users");
  if (query.q) {
    return userData.find(({ name }) => name === query.q);
  }
  return userData;
}
/**
 * get user by its email
 * @param userEmail email:string
 * @returns user
 */
export function getUserByEmail(userEmail: string) {
  logger.info("get users by email");
  const result = userData.find(({ email }) => email.includes(userEmail));
  return result;
}
/**
 * get user by its id
 * @param id :number
 * @returns user
 */
export function getUserById(id: number) {
  logger.info("get user by id " + id);
  const result = userData.find(({ id: userID }) => userID === id);
  return result;
}
/**
 * update a user by id
 * @param id number
 * @param user
 * @returns success or error
 */
export function updateUser(
  oldUser: IUser,
  newUser: Omit<IUser, "permissions">
) {
  const data = {
    ...newUser,
    permissions: [ROLE.USER],
  };
  logger.info("update user");
  Object.assign(oldUser, data);
  return data;
}
/**
 * deletes a user by id
 * @param id number
 * @returns success or error
 */
export function deleteUserById(id: number) {
  logger.info("delete user by id " + id);
  userData = userData.filter(({ id: userId }) => userId !== id);
}
