import expect from "expect";
import request from "supertest";
import express from "express";
import config from "../../config";
import { expressStarter } from "../../utils/express";
import * as UserUtils from "../../utils";
import bcrypt from "bcrypt";
import sinon from "sinon";

describe("Auth integration Test Suite", () => {
  const app = express();
  expressStarter(app);
  const user = {
    email: "shyam@dsa.com",
    password: "test123",
  };
  // integration test to login
  let userUtilsSigninStub: sinon.SinonStub;
  let bcryptCompareStub: sinon.SinonStub;
  beforeEach(() => {
    userUtilsSigninStub = sinon.stub(UserUtils, "signUser");
    bcryptCompareStub = sinon.stub(bcrypt, "compare");
  });
  afterEach(() => {
    userUtilsSigninStub.restore();
    bcryptCompareStub.restore();
  });
  const tokens = {
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  };
  //test to create tokens
  it("should create refresh and access token", async () => {
    bcryptCompareStub.resolves("hashedPassword");
    userUtilsSigninStub.returns(tokens);
    const response = await request(app)
      .post("/auth/login")
      .set("Authorization", `Bearer ${config.token.admin}`)
      .send(user);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(tokens);
  });
  //test to refresh refresh tokens
  it("should create a refresh token", async () => {
    const response = await request(app)
      .post("/auth/refresh")
      .set("Authorization", `Bearer ${config.token.admin}`);
    expect(response.status).toEqual(200);
  });
});
