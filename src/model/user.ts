import { IUser } from "../interface/user";
import { IQuery } from "../interface/utils";
export const userData: IUser[] = [
  {
    id: 1,
    name: "shyam",
    email: "shyam@dsa.com",
    password: "$2b$10$YhJ5jlYyVJYgCdZh/VSkLef5IQxM9e.riexIpwjBsdIMhTLx.f/W6",
  },
  {
    id: 2,
    name: "ram",
    email: "ram@asd.com",
    password: "$2b$10$ghbVSv1sFMuYIEh5PcRn/eTEtqSx8fE/YrXyP5m5834gnCxj5/IlO",
  },
];
/**
 * push the user in the array
 * @param user

 */
export async function createUser(user: IUser) {
  userData.push({
    ...user,
    id: userData.length + 1,
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
