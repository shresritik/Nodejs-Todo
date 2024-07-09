import { IUser } from "../interface/user";
import { userData } from "../model/user";
import bcrypt from "bcrypt";
export async function createUser(body: IUser) {
  const hashPassword = await bcrypt.hash(body.password, 10);
  return userData.push({
    id: userData.length + 1,
    name: body.name,
    email: body.email,
    password: hashPassword,
  });
}
export function getUsers() {
  return userData;
}
export function getUserByEmail(userEmail: string) {
  console.log(
    userData.find(({ email }) => {
      console.log(email, userEmail);

      email === userEmail;
    })
  );
  return userData.find(({ email }) => email === userEmail);
}
