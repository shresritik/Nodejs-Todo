import { verify } from "jsonwebtoken";
import { IUser } from "../interface/user";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import config from "../config";
import { signUser } from "../utils";
import { BadRequest } from "../error";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("AuthService");
/**
 * login the user if email or password exists and generate the tokens
 * @param body email|password
 * @returns {access token, refresh token}
 */
export async function login(
  body: Pick<IUser, "email" | "password" | "permissions">
) {
  const existingUser = getUserByEmail(body.email);
  if (!existingUser) {
    throw new BadRequest("Invalid email or password");
  }
  const existingPasword = await bcrypt.compare(
    body.password,
    existingUser.password
  );
  if (!existingPasword) throw new BadRequest("Invalid email or password");
  const payload: Omit<IUser, "password"> = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    permissions: existingUser.permissions,
  };
  logger.info("sign user");
  return signUser(payload);
}
/**
 *generate new tokens from the previous refresh token
 * @param token refresh token
 * @returns {access token, refresh token}
 */
export async function refresh(token: string) {
  try {
    const { id, email, name } = verify(token, config.jwt.secret!) as Pick<
      IUser,
      "id" | "email" | "name"
    >;
    const payload = {
      id,
      email,
      name,
    };
    logger.info("refresh token");
    return signUser(payload);
  } catch (error: unknown) {
    if (error instanceof Error) throw new BadRequest(error.message);
    else {
      throw new BadRequest("Something went wrong");
    }
  }
}
