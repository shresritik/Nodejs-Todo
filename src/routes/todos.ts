import express from "express";
import {
  createTodo,
  readAllTodos,
  updateTodo,
  readTodo,
  deleteTodo,
} from "../controller/todos";
const router = express();
// route handler to create a todo
router.post("/", createTodo);
// route handler to read all todos
router.get("/", readAllTodos);
// route handler to read a todos by id
router.get("/:id", readTodo);
// route handler to update a todos
router.put("/:id", updateTodo);
// route handler to delete a todo by id
router.delete("/:id", deleteTodo);

export default router;
