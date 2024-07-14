import expect from "expect";
import request from "supertest";
import express from "express";
import config from "../../config";
import { expressStarter } from "../../utils/express";
import * as UserUtils from "../../utils";
import bcrypt from "bcrypt";
import sinon from "sinon";
describe.only("Todo integration Test Suite", () => {
  const app = express();
  expressStarter(app);
  const user = {
    email: "shyam@dsa.com",
    password: "test123",
  };
  // integration test to create a todo
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
  it("should create refresh and access token", async () => {
    bcryptCompareStub.resolves("hashedPassword");
    userUtilsSigninStub.returns(tokens);
    const response = await request(app)
      .post("/auth/login")
      .set("Authorization", `Bearer ${config.token}`)
      .send(user);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(tokens);
  });
  it("should create a refresh token", async () => {
    const response = await request(app)
      .post("/auth/refresh")
      .set("Authorization", `Bearer ${config.token}`);
    expect(response.status).toEqual(200);
  });
});
