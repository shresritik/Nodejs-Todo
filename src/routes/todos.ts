import express from "express";
import {
  createTodo,
  readAllTodos,
  updateTodo,
  readTodo,
  deleteTodo,
} from "../controller/todos";
import { authenticate, authorize } from "../middleware/auth";
const router = express();
// route handler to create a todo
router.post("/", authenticate, authorize("user"), createTodo);
// route handler to read all todos
router.get("/", authenticate, authorize(["user", "super-admin"]), readAllTodos);
// route handler to read a todos by id
router.get("/:id", authenticate, authorize(["user", "super-admin"]), readTodo);
// route handler to update a todos
router.put("/:id", authenticate, authorize("user"), updateTodo);
// route handler to delete a todo by id
router.delete("/:id", authenticate, authorize("user"), deleteTodo);

export default router;
