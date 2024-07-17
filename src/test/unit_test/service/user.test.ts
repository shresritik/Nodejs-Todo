import expect from "expect";
import sinon from "sinon";
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
} from "../../../service/user";
import { UserModel } from "../../../model/user";
import { NotFound } from "../../../error";
import bcrypt from "bcrypt";
import { IUser } from "../../../interface/user";
import { permissions } from "../../../constants";
import { ROLE } from "../../../enum";
describe("User Service Test Suite", () => {
  const user: IUser = {
    id: 1,
    name: "test",
    email: "test@test.com",
    password: "test123",
    permissions: permissions[ROLE.USER],
  };
  //test get user by id
  describe("getUserById", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;
    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
    });
    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });
    it("should throw error when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);
      expect(async () => await getUserById(1)).rejects.toThrow(
        new NotFound("No user found with the id 1")
      );
    });
    it("should return user if user is found", async () => {
      userModelGetUserByIdStub.returns(user);
      const response = await getUserById(1);
      expect(response).toStrictEqual(user);
    });
  });
  //test delete user by id
  describe("deleteUserById", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;
    let userModelDeleteUserByIdStub: sinon.SinonStub;
    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
      userModelDeleteUserByIdStub = sinon.stub(UserModel, "deleteUserById");
    });
    afterEach(() => {
      userModelGetUserByIdStub.restore();
      userModelDeleteUserByIdStub.restore();
    });
    it("should throw error when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);

      expect(async () => await deleteUserById(1)).rejects.toThrow(
        new NotFound("No user found with the id 1")
      );
    });
    it("should delete user if user is found", async () => {
      userModelGetUserByIdStub.returns(user);
      userModelDeleteUserByIdStub.returns({ message: "success" });

      const success = {
        message: "User deleted",
      };
      const response = await deleteUserById(1);
      expect(response).toStrictEqual(success);
    });
  });
  //test get user by email
  describe("getUserByEmail", () => {
    let userModelGetUserByEmailStub: sinon.SinonStub;
    beforeEach(() => {
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
    });
    afterEach(() => {
      userModelGetUserByEmailStub.restore();
    });
    it("should throw error when user is not found", () => {
      userModelGetUserByEmailStub.returns(undefined);
      expect(async () => await getUserByEmail("")).rejects.toThrow(
        new NotFound("No user found")
      );
    });
    it("should return user if user is found", async () => {
      userModelGetUserByEmailStub.returns(user);
      const response = await getUserByEmail(user.email);
      expect(response).toStrictEqual(user);
    });
  });
  //test get users
  describe("getUsers", () => {
    let userModelGetUsersStub: sinon.SinonStub;
    beforeEach(() => {
      userModelGetUsersStub = sinon.stub(UserModel, "getUsers");
    });
    afterEach(() => {
      userModelGetUsersStub.restore();
    });
    it("should say user is empty", async () => {
      userModelGetUsersStub.returns(0);
      const res = await getUsers({ q: "asd" });
      expect(res[0]).toStrictEqual(undefined);
    });
    it("should return user if user is found", async () => {
      const users: IUser[] = [user];
      userModelGetUsersStub.returns(users);
      const response = (await getUsers({ q: "asd" }))[0];
      expect([response]).toStrictEqual(users);
    });
  });
  //test create user
  describe("create User", () => {
    let userModelcreateUserStub: sinon.SinonStub;
    let bcryptHashStub: sinon.SinonStub;
    beforeEach(() => {
      userModelcreateUserStub = sinon.stub(UserModel, "createUser");
      bcryptHashStub = sinon.stub(bcrypt, "hash");
    });
    afterEach(() => {
      userModelcreateUserStub.restore();
      bcryptHashStub.restore();
    });
    it("should create a user", async () => {
      bcryptHashStub.resolves("HashedPassword");

      userModelcreateUserStub.returns(user);
      const response = await createUser(1, user);
      expect(response).toStrictEqual(user);
    });
  });
  //test update user
  describe("update User", () => {
    let userModelUpdateUserStub: sinon.SinonStub;
    let userModelGetUserByIdStub: sinon.SinonStub;
    let bcryptHashStub: sinon.SinonStub;
    beforeEach(() => {
      userModelUpdateUserStub = sinon.stub(UserModel, "updateUser");
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
      bcryptHashStub = sinon.stub(bcrypt, "hash");
    });
    afterEach(() => {
      userModelUpdateUserStub.restore();
      userModelGetUserByIdStub.restore();
      bcryptHashStub.restore();
    });
    it("should update a user", async () => {
      bcryptHashStub.resolves("HashedPassword");

      userModelUpdateUserStub.returns(user);
      userModelGetUserByIdStub.returns(user);
      const response = await updateUser(1, 1, user);
      expect(response).toStrictEqual(user);
    });
    it("should throw an error if user not found", () => {
      userModelGetUserByIdStub.returns(undefined);
      expect(async () => await updateUser(1, 1, user)).rejects.toThrow(
        new NotFound("No user found with the id 1")
      );
    });
  });
});
