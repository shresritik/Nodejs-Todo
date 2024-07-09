import express from "express";
import projectRouter from "./todos";
import userRouter from "./user";
import authRouter from "./auth";
const router = express();
router.use("/projects", projectRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
