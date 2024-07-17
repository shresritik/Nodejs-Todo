import config from "../config";
import { ROLE } from "../enum";
import { BadRequest, NotFound } from "../error";
import { IUser } from "../interface/user";
import { IQuery } from "../interface/utils";
import loggerWithNameSpace from "../utils/logger";
import BaseModel from "./base";
const logger = loggerWithNameSpace("UserModel");

export let userData: IUser[] = [
  {
    id: 1,
    name: "shyam",
    email: "shyam@dsa.com",
    password: config.password!,
    permissions: [ROLE.ADMIN],
  },
];
export class UserModel extends BaseModel {
  //get user by email
  static getUserByEmail(userEmail: string) {
    const res = this.queryBuilder()
      .select(
        "users.id",
        "users.name",
        "users.password",
        this.queryBuilder().raw("ARRAY_AGG(roles.roles) AS permissions")
      )
      .table("users")
      .leftJoin("users_roles", "users.id", "users_roles.user_id")
      .leftJoin("roles", "users_roles.roles_id", "roles.id")
      .groupBy("users.id", "users.name", "users.password")
      .where("users.email", userEmail);
    return res;
  }
  // get user by id
  static getUserById(id: number) {
    const res = this.queryBuilder()
      .select(
        "users.id",
        "users.name",
        "users.password",
        this.queryBuilder().raw("ARRAY_AGG(roles.roles) AS permissions")
      )
      .table("users")
      .join("users_roles", "users.id", "users_roles.user_id")
      .join("roles", "users_roles.roles_id", "roles.id")
      .groupBy("users.id", "users.name", "users.password")
      .where("users.id", id)
      .first();
    return res;
  }
  //create user and assign user roles and permissions
  static async createUser(createdBy: number, user: IUser) {
    logger.info("create a user");
    const data = {
      name: user.name,
      password: user.password,
      email: user.email,

      createdBy: createdBy,
    };

    await this.queryBuilder().insert(data).table("users");
    const usersId = (await this.getUserByEmail(user.email))[0];

    const userRoles = {
      userId: usersId.id,
      roles_id: 2,
    };

    await this.queryBuilder().insert(userRoles).table("users_roles");
    const rolesPermission = [
      {
        roleId: 2,
        permissionId: 1,
      },
      {
        roleId: 2,
        permissionId: 2,
      },
      {
        roleId: 2,
        permissionId: 3,
      },
      {
        roleId: 2,
        permissionId: 4,
      },
    ];

    await this.queryBuilder()
      .insert(rolesPermission)
      .table("roles_permissions");
    await this.queryBuilder()
      .table("roles")
      .select("roles")
      .whereIn("roles.id", function () {
        this.select("users_roles.roles_id")
          .from("users")
          .join("users_roles", "users.id", "users_roles.user_id")
          .where("users.id", usersId.id);
      });
    const response = {
      id: usersId.id,
      name: user.name,
      password: user.password,
      email: user.email,
    };
    return response;
  }
  // update user
  static async updateUser(
    updatedBy: number,
    oldUser: IUser,
    user: Omit<IUser, "permissions">
  ) {
    logger.info("update a user");
    const data = {
      name: user.name,
      password: user.password,
      email: user.email,
      updatedBy: updatedBy,
      updatedAt: new Date(),
    };

    await this.queryBuilder()
      .update(data)
      .table("users")
      .where({ id: oldUser.id });

    return { ...data, id: oldUser.id, permissions: oldUser.permissions };
  }
  // get all users and add pagination
  static getUsers(filter: IQuery) {
    const { q, page, size } = filter;
    const query = this.queryBuilder()
      .select(
        "users.id",
        "users.name",
        "users.password",
        this.queryBuilder().raw("ARRAY_AGG(roles.roles) AS permissions")
      )
      .table("users")
      .join("users_roles", "users.id", "users_roles.user_id")
      .join("roles", "users_roles.roles_id", "roles.id")
      .groupBy("users.id", "users.name", "users.password")
      .limit(size)
      .offset((page - 1) * size);

    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
  // count number of users
  static count(filter: IQuery) {
    const { q } = filter;
    const query = this.queryBuilder().count("*").table("users").first();

    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
  static async deleteUserById(id: number) {
    const res = this.queryBuilder().delete().table("users").where({ id });
    await res;
  }
}
/**
 * push the user in the array
 * @param user
 */
export function createUser(user: IUser) {
  logger.info("create a user");
  const data = {
    id: userData.length + 1,
    name: user.name,
    password: user.password,
    email: user.email,
    permissions: [ROLE.USER],
  };
  userData.push(data);
  return data;
}
/**
 * get all the users or a user based on the query
 * @param query name of the user to retrieve
 * @returns user
 */
export function getUsers(query: IQuery) {
  logger.info("get users");
  if (query.q) {
    return userData.find(({ name }) => name === query.q);
  }
  return userData;
}
/**
 * get user by its email
 * @param userEmail email:string
 * @returns user
 */
export function getUserByEmail(userEmail: string) {
  logger.info("get users by email");
  const result = userData.find(({ email }) => email.includes(userEmail));
  return result;
}
/**
 * get user by its id
 * @param id :number
 * @returns user
 */
export function getUserById(id: number) {
  logger.info("get user by id " + id);
  const result = userData.find(({ id: userID }) => userID === id);
  return result;
}
/**
 * update a user by id
 * @param id number
 * @param user
 * @returns success or error
 */
export function updateUser(
  oldUser: IUser,
  newUser: Omit<IUser, "permissions">
) {
  const data = {
    ...newUser,
    permissions: [ROLE.USER],
  };
  logger.info("update user");
  Object.assign(oldUser, data);
  return data;
}
/**
 * deletes a user by id
 * @param id number
 * @returns success or error
 */
export function deleteUserById(id: number) {
  logger.info("delete user by id " + id);
  userData = userData.filter(({ id: userId }) => userId !== id);
}
