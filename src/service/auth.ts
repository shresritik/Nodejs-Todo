import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interface/user";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import config from "../config";
import { signUser } from "../utils";
/**
 * login the user if email or password exists and generate the tokens
 * @param body email|password
 * @returns {access token, refresh token}
 */
export async function login(body: Pick<IUser, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);
  if (!existingUser) {
    return { error: "Invalid email or password" };
  }
  const existingPasword = await bcrypt.compare(
    body.password,
    existingUser.password
  );
  if (!existingPasword) return { error: "Invalid email or password" };
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  };
  return signUser(payload);
}
/**
 *generate new tokens from the previous refresh token
 * @param token refresh token
 * @returns {access token, refresh token}
 */
export async function refresh(token: string) {
  const { id, email, name } = verify(token, config.jwt.secret!) as Pick<
    IUser,
    "id" | "email" | "name"
  >;
  const payload = {
    id,
    email,
    name,
  };
  return signUser(payload);
}
