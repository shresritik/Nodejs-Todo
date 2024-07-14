import expect from "expect";
import sinon from "sinon";
import * as UserService from "../../../service/user";
import { login, refresh } from "../../../service/auth";
import { IUser } from "../../../interface/user";
import { ROLE } from "../../../enum";
import bcrypt from "bcrypt";
import * as UserUtils from "../../../utils";

import { BadRequest } from "../../../error";
describe("Auth Test Suite", () => {
  const tokens = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  };
  describe("login", () => {
    let userServiceUserEmailStub: sinon.SinonStub;
    let bcryptHashStub: sinon.SinonStub;
    let userUtilsSigninStub: sinon.SinonStub;

    beforeEach(() => {
      userServiceUserEmailStub = sinon.stub(UserService, "getUserByEmail");
      bcryptHashStub = sinon.stub(bcrypt, "compare");
      userUtilsSigninStub = sinon.stub(UserUtils, "signUser");
    });
    afterEach(() => {
      userServiceUserEmailStub.restore();
      bcryptHashStub.restore();
      userUtilsSigninStub.restore();
    });
    it("should login", async () => {
      userServiceUserEmailStub.returns("userEmail");
      bcryptHashStub.resolves("hashedPassword");

      userUtilsSigninStub.returns(tokens);
      const user: Pick<IUser, "email" | "password" | "permissions"> = {
        email: "test@test.com",
        password: "hashedPassword",
        permissions: [ROLE.ADMIN],
      };

      const userLogin = await login(user);
      expect(userLogin).toStrictEqual(tokens);
    });
    it("should throw error if invalid email or password", async () => {
      userServiceUserEmailStub.returns(undefined);
      bcryptHashStub.resolves(undefined);

      userUtilsSigninStub.returns(tokens);
      const user: Pick<IUser, "email" | "password" | "permissions"> = {
        email: "",
        password: "",
        permissions: [ROLE.ADMIN],
      };

      expect(async () => await login(user)).rejects.toThrow(
        new BadRequest("Invalid email or password")
      );
    });
  });
  describe("refresh", async () => {
    let userUtilsSigninStub: sinon.SinonStub;
    let verifyUserStub: sinon.SinonStub;
    beforeEach(() => {
      userUtilsSigninStub = sinon.stub(UserUtils, "signUser");
      verifyUserStub = sinon.stub(UserUtils, "mockVerify");
    });
    afterEach(() => {
      userUtilsSigninStub.restore();
      verifyUserStub.restore();
    });
    it("should refresh user", () => {
      const user = {
        id: 1,
        email: "test@test.com",
        name: "test",
      };
      verifyUserStub.returns(user);
      userUtilsSigninStub.returns(tokens);
      const result = refresh(tokens.refreshToken);
      expect(result).resolves.toStrictEqual(tokens);
    });
  });
});
