import express from "express";
import projectRouter from "./todos";
const router = express();
router.use("/projects", projectRouter);
export default router;
