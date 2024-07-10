import { ROLE } from "../enum";
import { IUser } from "../interface/user";
import { IQuery } from "../interface/utils";

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
  return userData.find(({ email }) => email.includes(userEmail));
}
export function getUserById(id: number) {
  return userData.find(({ id: userID }) => userID === id);
}
export function updateUser(
  id: number,
  user: Pick<IUser, "email" | "name" | "password">
) {
  const idx = userData.findIndex(({ id: userId }) => userId === id);
  if (idx == -1) {
    return { error: "No user found" };
  } else {
    userData[idx] = { ...userData[idx], ...user };
    return { message: "User updated" };
  }
}
export function deleteUserById(id: number) {
  const idx = userData.findIndex(({ id: userID }) => userID === id);
  if (idx == -1) {
    return { error: "No user found" };
  } else {
    userData.splice(idx, 1);
    return { message: "User deleted" };
  }
}
