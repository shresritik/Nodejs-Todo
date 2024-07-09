import express from "express";
import { createUser, getUsers } from "../controller/user";
import { auth } from "../middleware/auth";

const router = express();
//router handler to create a user
router.post("/", createUser);
//router handler to get all users
router.get("/", auth, getUsers);
export default router;
