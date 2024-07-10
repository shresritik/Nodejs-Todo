import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  getUserById,
  deleteUserById,
} from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";
import { ROLE } from "../enum";

const router = express();
//router handler to create a user
router.post("/", authenticate, authorize(ROLE.ADMIN), createUser);
//router handler to get all users
router.get("/", authenticate, authorize(ROLE.ADMIN), getUsers);
//router handler to update a users by id
router.put("/:id", authenticate, authorize(ROLE.ADMIN), updateUser);
//router handler to get a user by id
router.get("/:id", authenticate, authorize(ROLE.ADMIN), getUserById);
//router handler to delete a user by id
router.delete("/:id", authenticate, authorize(ROLE.ADMIN), deleteUserById);
export default router;
