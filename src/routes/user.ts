import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  getUserById,
  deleteUserById,
} from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "../enum";
import {
  validateReqBody,
  validateReqId,
  validateReqQuery,
} from "../middleware/validator";
import {
  createUserSchema,
  getUserByIdSchema,
  updateUserSchema,
  getUserByQuerySchema,
} from "../schema/user";

const router = express();
//router handler to create a user
router.post(
  "/",
  authenticate,
  authorize(PERMISSION.USER_POST),
  validateReqBody(createUserSchema),
  createUser
);
//router handler to get all users
router.get(
  "/",
  authenticate,
  authorize(PERMISSION.USER_GET),
  validateReqQuery(getUserByQuerySchema),
  getUsers
);
//router handler to update a users by id
router.put(
  "/:id",
  authenticate,
  authorize(PERMISSION.USER_PUT),
  validateReqId(getUserByIdSchema),
  validateReqBody(updateUserSchema),
  updateUser
);
//router handler to get a user by id
router.get(
  "/:id",
  authenticate,
  authorize(PERMISSION.USER_GET),
  validateReqId(getUserByIdSchema),
  getUserById
);
//router handler to delete a user by id
router.delete(
  "/:id",
  authenticate,
  authorize(PERMISSION.USER_DELETE),
  deleteUserById
);
export default router;
