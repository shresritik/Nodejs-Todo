import request from "supertest";
import express from "express";
import bcrypt from "bcrypt";
import config from "../../config";
import expect from "expect";
import sinon from "sinon";
import { afterEach } from "mocha";
import { expressStarter } from "../../utils/express";
import { permissions } from "../../constants";
import { UserModel } from "../../model/user";
describe("User Integration Test Suite", () => {
  const app = express();
  expressStarter(app);
  const user = {
    name: "User Integration",
    email: "user2@test.com",
    password: "test1234567Aa!",
    permissions: permissions.user,
  };
  const res = {
    id: 1,
    name: user.name,
    password: "hashedPassword",
    email: user.email,
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
    const user = {
      name: "User Integration",
      email: "user3@test.com",
      password: "test1234567Aa!",
      permissions: permissions.user,
    };

    bcryptHashStub.resolves("hashedPassword");
    let UserModelCreateUser: sinon.SinonStub = sinon
      .stub(UserModel, "createUser")
      .resolves(res);
    let UserModelGetUserByEmail: sinon.SinonStub = sinon
      .stub(UserModel, "getUserByEmail")
      .resolves([]);
    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${config.token.admin}`)
      .send(user);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty(["name"]);
    UserModelCreateUser.restore();
    UserModelGetUserByEmail.restore();
  });
  // integration test to update a user
  it("Should update a user", async () => {
    bcryptHashStub.resolves("hashedPassword");
    let UserModelGetUserById: sinon.SinonStub = sinon
      .stub(UserModel, "getUserById")
      .resolves({ ...res });
    let UserModelUpdateUser: sinon.SinonStub = sinon
      .stub(UserModel, "updateUser")
      .resolves({
        id: 1,
        permissions: user.permissions,
        name: user.name,
        password: "hashedPassword",
        email: user.email,
        updatedBy: 1,
        updatedAt: new Date(),
      });
    const response = await request(app)
      .put("/users/1")
      .set("Authorization", `Bearer ${config.token.admin}`)
      .send(user);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(["name"]);
    UserModelGetUserById.restore();
    UserModelUpdateUser.restore();
  });
  // // integration test to get a user
  it("Should get a user", async () => {
    let UserModelGetUserById: sinon.SinonStub = sinon
      .stub(UserModel, "getUsers")
      .resolves([{ ...res }]);
    const response = await request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${config.token.admin}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(["name"]);
    UserModelGetUserById.restore();
  });
  //  integration test to get all users
  it("Should get all users", async () => {
    let UserModelGetUsers: sinon.SinonStub = sinon
      .stub(UserModel, "getUsers")
      .resolves([{ ...res }]);
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${config.token.admin}`);

    expect(response.status).toEqual(200);
    expect(response.body[0]).toStrictEqual(res);
    UserModelGetUsers.restore();
  });
  // integration test to delete a user
  it("Should get delete a users", async () => {
    let UserModelGetUserById: sinon.SinonStub = sinon
      .stub(UserModel, "getUsers")
      .resolves([{ ...res }]);
    let UserModelDeleteUser: sinon.SinonStub = sinon
      .stub(UserModel, "deleteUserById")
      .resolves(1);
    const response = await request(app)
      .delete("/users/1")
      .set("Authorization", `Bearer ${config.token.admin}`);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual({ message: "User deleted" });
    UserModelDeleteUser.restore();
    UserModelGetUserById.restore();
  });
});
