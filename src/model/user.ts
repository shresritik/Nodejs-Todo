import { ROLE } from "../enum";
import { IUser } from "../interface/user";
import { IQuery } from "../interface/utils";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("UserModel");
export const userData: IUser[] = [
  {
    id: 1,
    name: "shyam",
    email: "shyam@dsa.com",
    password: "$2b$10$jHHqrh4QLprCkIe8lwVwEuovsZL9gk6NOME04g.SEMHvyd1G7obI6",
    permissions: [ROLE.ADMIN],
  },
  {
    id: 2,
    name: "ram",
    email: "ram@asd.com",
    password: "$2b$10$ghbVSv1sFMuYIEh5PcRn/eTEtqSx8fE/YrXyP5m5834gnCxj5/IlO",
    permissions: [ROLE.ADMIN],
  },
];
/**
 * push the user in the array
 * @param user

 */
export function createUser(user: IUser) {
  logger.info("create a user");
  if (
    !user ||
    !user.email ||
    !user.password ||
    !user.name ||
    user.email.length == 0 ||
    user.password.length == 0 ||
    user.name.length == 0 ||
    user.password.length == 0
  )
    throw new Error("User details is not complete");

  userData.push({
    ...user,
    id: userData.length + 1,
    permissions: [ROLE.USER],
  });
  return user;
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
  if (userData.length == 0) throw new Error("User Data is Empty");
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
  if (!result) throw new Error("No user found");
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
  if (!result) throw new Error("No user found");
  return result;
}
/**
 * update a user by id
 * @param id number
 * @param user
 * @returns success or error
 */
export function updateUser(
  id: number,
  user: Pick<IUser, "email" | "name" | "password">
) {
  logger.info("update user by id " + id);
  const idx = userData.findIndex(({ id: userId }) => userId === id);
  if (idx == -1) {
    throw new Error("No user found");
  } else {
    userData[idx] = { ...userData[idx], ...user };
    return { message: "User updated" };
  }
}
/**
 * deletes a user by id
 * @param id number
 * @returns success or error
 */
export function deleteUserById(id: number) {
  logger.info("delete user by id " + id);
  const idx = userData.findIndex(({ id: userID }) => userID === id);
  if (idx == -1) {
    throw new Error("No user found");
  } else {
    userData.splice(idx, 1);
    return { message: "User deleted" };
  }
}
