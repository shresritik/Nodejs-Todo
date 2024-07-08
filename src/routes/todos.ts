import express from "express";
import {
  createTodo,
  readAllTodos,
  updateTodo,
  readTodo,
  deleteTodo,
} from "../controller/todos";
const router = express();
router.get("/", readAllTodos);
router.get("/:id", readTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
