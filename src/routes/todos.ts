import express from "express";
import {
  createTodo,
  readAllTodos,
  updateTodo,
  readTodo,
  deleteTodo,
} from "../controller/todos";
import { authenticate, authorize } from "../middleware/auth";
import { PERMISSION } from "../enum";
import {
  validateReqBody,
  validateReqId,
  validateReqQuery,
} from "../middleware/validator";
import {
  createTodoSchema,
  getTodoByIdSchema,
  getTodoByQuerySchema,
  updateTodoSchema,
} from "../schema/todo";
const router = express();
// route handler to create a todo
router.post(
  "/",
  authenticate,
  authorize(PERMISSION.TODO_POST),
  validateReqBody(createTodoSchema),
  createTodo
);
// route handler to read all todos
router.get(
  "/",
  authenticate,
  authorize(PERMISSION.TODO_GET),
  validateReqQuery(getTodoByQuerySchema),
  readAllTodos
);
// route handler to read a todos by id
router.get(
  "/:id",
  authenticate,
  authorize(PERMISSION.TODO_GET),
  validateReqId(getTodoByIdSchema),
  readTodo
);
// route handler to update a todos
router.put(
  "/:id",
  authenticate,
  authorize(PERMISSION.TODO_PUT),
  validateReqId(getTodoByIdSchema),
  validateReqBody(updateTodoSchema),
  updateTodo
);
// route handler to delete a todo by id
router.delete(
  "/:id",
  authenticate,
  authorize(PERMISSION.TODO_DELETE),
  deleteTodo
);

export default router;
