import express from "express";
import projectRouter from "./todos";
const router = express();
router.use("/projects", projectRouter);
router.use("/", (req, res) => {
  res.redirect("/projects");
});
export default router;
