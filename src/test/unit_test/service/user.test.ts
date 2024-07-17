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
import * as UserModel from "../../../model/user";
import { NotFound } from "../../../error";
import bcrypt from "bcrypt";
import { IUser } from "../../../interface/user";
import { ROLE } from "../../../enum";
describe("User Service Test Suite", () => {
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
      expect(() => getUserById(1)).toThrow(
        new NotFound("No user found with the id 1")
      );
    });
    it("should return user if user is found", () => {
      const user: IUser = {
        id: 1,
        name: "test",
        email: "test@test.com",
        password: "test123",
        permissions: [ROLE.ADMIN],
      };
      userModelGetUserByIdStub.returns(user);
      const response = getUserById(1);
      expect(response).toStrictEqual(user);
    });
  });
  //test delete user by id
  describe("deleteUserById", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;
    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
    });
    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });
    it("should throw error when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);
      expect(() => deleteUserById(1)).toThrow(
        new NotFound("No user found with the id 1")
      );
    });
    it("should delete user if user is found", () => {
      const user: IUser = {
        id: 1,
        name: "test",
        email: "test@test.com",
        password: "test123",
        permissions: [ROLE.ADMIN],
      };
      userModelGetUserByIdStub.returns(user);

      const success = {
        message: "User deleted",
      };
      const response = deleteUserById(1);
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
      expect(() => getUserByEmail("")).toThrow(new NotFound("No user found"));
    });
    it("should return user if user is found", () => {
      const user: IUser = {
        id: 1,
        name: "test",
        email: "test@test.com",
        password: "test123",
        permissions: [ROLE.ADMIN],
      };
      userModelGetUserByEmailStub.returns(user);
      const response = getUserByEmail(user.email);
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
    it("should say user is empty", () => {
      userModelGetUsersStub.returns(0);
      expect(getUsers({ q: "asd" })).toStrictEqual(0);
    });
    it("should return user if user is found", () => {
      const user: IUser[] = [
        {
          id: 1,
          name: "test",
          email: "test@test.com",
          password: "test123",
          permissions: [ROLE.ADMIN],
        },
      ];
      userModelGetUsersStub.returns(user);
      const response = getUsers({ q: "asd" });
      expect(response).toStrictEqual(user);
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
      const user: IUser = {
        id: 1,
        name: "test",
        email: "test@test.com",
        password: "test123",
        permissions: [ROLE.ADMIN],
      };
      userModelcreateUserStub.returns(user);
      const response = await createUser(1, user);
      expect(response).toStrictEqual(user);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);
      expect(userModelcreateUserStub.getCall(0).args).toStrictEqual([
        {
          ...user,
          password: "HashedPassword",
        },
      ]);
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
      const user: IUser = {
        id: 1,
        name: "test",
        email: "test@test.com",
        password: "test123",
        permissions: [ROLE.ADMIN],
      };
      userModelUpdateUserStub.returns(user);
      userModelGetUserByIdStub.returns(user);
      const response = await updateUser(1, 1, user);
      expect(response).toStrictEqual(user);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);
      expect(userModelUpdateUserStub.getCall(0).args).toStrictEqual([
        user,
        {
          name: user.name,
          email: user.email,
          id: user.id,
          permissions: user.permissions,
          password: "HashedPassword",
        },
      ]);
    });
    it("should throw an error if user not found", () => {
      const user: IUser = {
        id: 1,
        name: "test",
        email: "test@test.com",
        password: "test123",
        permissions: [ROLE.ADMIN],
      };
      userModelGetUserByIdStub.returns(undefined);
      expect(async () => await updateUser(1, 1, user)).rejects.toThrow(
        new NotFound("No user found with the id 1")
      );
    });
  });
});
