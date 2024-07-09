import { sign } from "jsonwebtoken";
import { STATUS } from "../enum";
import config from "../config";
import { IUser } from "../interface/user";
/**
 * checks if the response is in STATUS (complete,incomplete,ongoing)
 * @param response string
 * @returns Boolean
 */
export function isValidStatus(response: string): boolean {
  return Object.values(STATUS).includes(response as STATUS);
}
export function signUser(payload: Pick<IUser, "id" | "email" | "name">) {
  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });
  return { accessToken, refreshToken };
}
