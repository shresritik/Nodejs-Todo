import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  getUserById,
  deleteUserById,
} from "../controller/user";
import { authenticate, authorize } from "../middleware/auth";

const router = express();
//router handler to create a user
router.post("/", authenticate, authorize("super-admin"), createUser);
//router handler to get all users
router.get("/", authenticate, getUsers);
router.put("/:id", authenticate, authorize("super-admin"), updateUser);
router.get("/:id", authenticate, authorize("super-admin"), getUserById);
router.delete("/:id", authenticate, authorize("super-admin"), deleteUserById);
export default router;
