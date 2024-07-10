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
router.get("/", authenticate, getUsers);
router.put("/:id", authenticate, authorize(ROLE.ADMIN), updateUser);
router.get("/:id", authenticate, authorize(ROLE.ADMIN), getUserById);
router.delete("/:id", authenticate, authorize(ROLE.ADMIN), deleteUserById);
export default router;
