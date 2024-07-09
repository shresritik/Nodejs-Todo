import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interface/user";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import config from "../config";

export async function login(body: Pick<IUser, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);
  console.log(existingUser);
  if (!existingUser) {
    return { error: "Invalid email or password" };
  }
  const existingPasword = await bcrypt.compare(
    body.password,
    existingUser.password
  );
  console.log(existingPasword);
  if (!existingPasword) return { error: "Invalid email or password" };
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  };
  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });
  return { accessToken, refreshToken };
}
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
  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });
  return { accessToken, refreshToken };
}
