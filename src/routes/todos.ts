import express from "express";
import {
  createTodo,
  readAllTodos,
  updateTodo,
  readTodo,
  deleteTodo,
} from "../controller/todos";
import { authenticate, authorize } from "../middleware/auth";
import { ROLE } from "../enum";
const router = express();
// route handler to create a todo
router.post("/", createTodo);
// route handler to read all todos
router.get("/", authenticate, authorize([ROLE.USER, ROLE.ADMIN]), readAllTodos);
// route handler to read a todos by id
router.get("/:id", authenticate, authorize([ROLE.USER, ROLE.ADMIN]), readTodo);
// route handler to update a todos
router.put("/:id", authenticate, authorize(ROLE.USER), updateTodo);
// route handler to delete a todo by id
router.delete("/:id", authenticate, authorize(ROLE.USER), deleteTodo);

export default router;
