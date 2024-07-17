import { IUser } from "../interface/user";
import { getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import { mockVerify, signUser } from "../utils";
import { BadRequest } from "../error";
import loggerWithNameSpace from "../utils/logger";
import { UserModel } from "../model/user";
const logger = loggerWithNameSpace("AuthService");
/**
 * login the user if email or password exists and generate the tokens
 * @param body email|password
 * @returns {access token, refresh token}
 */
export async function login(
  body: Pick<IUser, "email" | "password" | "permissions">
) {
  const existingUser = (await getUserByEmail(body.email))[0];

  if (!existingUser || existingUser.length == 0) {
    throw new BadRequest("Invalid email or password");
  }

  const existingPasword = await bcrypt.compare(
    body.password,
    existingUser.password
  );
  if (!existingPasword) throw new BadRequest("Invalid email or password");
  const permissionOfUser = (await UserModel.findUserPermission(body.email)).map(
    (obj) => obj.permissions
  );
  const payload: Omit<IUser, "password"> = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    // permissions: existingUser.permissions,
    permissions: permissionOfUser,
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
    const { id, email, name } = mockVerify(token);
    const permissionOfUser = (await UserModel.findUserPermission(email)).map(
      (obj) => obj.permissions
    );
    const payload = {
      id,
      email,
      name,
      permissions: permissionOfUser,
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
