import express from "express";
import { createUser, getUsers } from "../controller/user";
import { auth } from "../middleware/auth";

const router = express();
router.post("/", createUser);
router.get("/", auth, getUsers);
export default router;
