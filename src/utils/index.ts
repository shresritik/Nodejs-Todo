import { sign, verify } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interface/user";
/**
 * sign the user with its payload and jwt secret
 * @param payload
 * @returns { accessToken, refreshToken }
 */
export function signUser(payload: Pick<IUser, "id" | "email" | "name">) {
  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });
  return { accessToken, refreshToken };
}
export function mockVerify(token: string) {
  return verify(token, config.jwt.secret!) as Pick<
    IUser,
    "id" | "email" | "name"
  >;
}
