import request from "supertest";
import express from "express";
import { ROLE } from "../../enum";
import bcrypt from "bcrypt";
import config from "../../config";
import expect from "expect";
import sinon from "sinon";
import { afterEach } from "mocha";
import { expressStarter } from "../../utils/express";
describe("User Integration Test Suite", () => {
  const app = express();
  expressStarter(app);
  const user = {
    name: "User Integration",
    email: "user@test.com",
    password: "test1234567Aa!",
    permissions: [ROLE.USER],
  };
  let bcryptHashStub: sinon.SinonStub;
  beforeEach(() => {
    bcryptHashStub = sinon.stub(bcrypt, "hash");
  });
  afterEach(() => {
    bcryptHashStub.restore();
  });
  //integration test to create a user
  it("Should create a user", async () => {
    bcryptHashStub.resolves("hashedPassword");
    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${config.token.admin}`)
      .send(user);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      ...user,
      password: "hashedPassword",
      id: 2,
    });
  });
  // integration test to update a user
  it("Should update a user", async () => {
    bcryptHashStub.resolves("hashedPassword");

    const response = await request(app)
      .put("/users/1")
      .set("Authorization", `Bearer ${config.token.admin}`)
      .send(user);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      ...user,
      password: "hashedPassword",
    });
  });
  // integration test to get a user
  it("Should get a user", async () => {
    const response = await request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${config.token.admin}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      ...user,
      id: 1,
      password: "hashedPassword",
    });
  });
  // integration test to get all users
  it("Should get all users", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${config.token.admin}`);
    expect(response.status).toEqual(200);
  });
  // integration test to delete a user
  it("Should get delete a users", async () => {
    const response = await request(app)
      .delete("/users/1")
      .set("Authorization", `Bearer ${config.token.admin}`);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({ message: "User deleted" });
  });
});
