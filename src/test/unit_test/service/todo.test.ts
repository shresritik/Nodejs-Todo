import sinon from "sinon";
import expect from "expect";
import * as TodoModel from "../../../model/todos";
import { ITodo } from "../../../interface/todo";
import { STATUS } from "../../../enum";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodo,
  updateTodo,
} from "../../../service/todos";
import { NotFound } from "../../../error";

describe.only("Todo Service Test Suite", () => {
  //test get all todos
  describe.only("getAllTodos", () => {
    let todoModelgetAllTodos: sinon.SinonStub;
    beforeEach(() => {
      todoModelgetAllTodos = sinon.stub(TodoModel, "getAllTodos");
    });
    afterEach(() => {
      todoModelgetAllTodos.restore();
    });
    it("should get all todos", async () => {
      const todo: ITodo[] = [
        {
          id: 1,
          name: "test",
          status: STATUS.ONGOING,
          userId: 1,
        },
      ];
      todoModelgetAllTodos.returns(todo);
      const result = await getAllTodos({}, 1);
      expect(result).resolves.toStrictEqual(todo);
    });
    it("should throw error if todo is not found", () => {
      todoModelgetAllTodos.returns(undefined);
      expect(async () => await getAllTodos({}, 1)).rejects.toThrow(
        new NotFound("No data found")
      );
    });
  });
  //test get todo by id
  describe("getTodoById", () => {
    let todoModelgetTodoById: sinon.SinonStub;
    beforeEach(() => {
      todoModelgetTodoById = sinon.stub(TodoModel, "getTodoById");
    });
    afterEach(() => {
      todoModelgetTodoById.restore();
    });
    it("should get todo by id", () => {
      const todo: ITodo = {
        id: 1,
        name: "test",
        status: STATUS.ONGOING,
        userId: 1,
      };

      todoModelgetTodoById.returns(todo);
      const result = getTodo("1", 1);
      expect(result).toStrictEqual(todo);
      expect(result).toStrictEqual(todo);
    });
    it("should throw error if todo is not found", () => {
      todoModelgetTodoById.returns(undefined);
      expect(async () => await getTodo("1", 1)).rejects.toThrow(
        new NotFound("No todo found by id 1")
      );
    });
  });
  //test delete todo by id
  describe("deleteTodoById", () => {
    let todoModelGetTodoById: sinon.SinonStub;
    beforeEach(() => {
      todoModelGetTodoById = sinon.stub(TodoModel, "getTodoById");
    });
    afterEach(() => {
      todoModelGetTodoById.restore();
    });
    it("should Delete todo by id", async () => {
      const todo: ITodo = {
        id: 1,
        name: "test",
        status: STATUS.ONGOING,
        userId: 1,
      };
      const success = { message: "Deleted" };
      todoModelGetTodoById.returns(todo);
      const result = await deleteTodo("1", todo.userId);
      expect(result).resolves.toStrictEqual(success);
      expect(todoModelGetTodoById.getCall(0).args).toStrictEqual([
        "1",
        todo.userId,
      ]);
    });
    it("should throw error if todo is not found", () => {
      todoModelGetTodoById.returns(undefined);
      expect(async () => await deleteTodo("1", 1)).rejects.toThrow(
        new NotFound("No todo found by id 1")
      );
    });
  });
  //test create a todo
  describe("createTodo", () => {
    let todoModelCreateTodo: sinon.SinonStub;
    beforeEach(() => {
      todoModelCreateTodo = sinon.stub(TodoModel, "createTodo");
    });
    afterEach(() => {
      todoModelCreateTodo.restore();
    });
    it("should create a todo", async () => {
      const success = { message: "success" };
      const todo: ITodo = {
        id: 1,
        name: "test",
        status: STATUS.ONGOING,
        userId: 1,
      };
      todoModelCreateTodo.returns(success);
      const result = await createTodo(todo, todo.userId);
      expect(result).resolves.toStrictEqual(success);
      expect(todoModelCreateTodo.getCall(0).args).toStrictEqual([
        todo,
        todo.userId,
      ]);
    });
  });
  //test update a todo by id
  describe("updateTodoById", () => {
    let todoModelUpdateTodo: sinon.SinonStub;
    let todoModelGetTodoById: sinon.SinonStub;

    beforeEach(() => {
      todoModelUpdateTodo = sinon.stub(TodoModel, "updateTodo");
      todoModelGetTodoById = sinon.stub(TodoModel, "getTodoById");
    });
    afterEach(() => {
      todoModelUpdateTodo.restore();
      todoModelGetTodoById.restore();
    });
    it("should update a todo", async () => {
      const success = { message: "success" };
      const todo: ITodo = {
        id: 1,
        name: "test",
        status: STATUS.ONGOING,
        userId: 1,
      };
      todoModelGetTodoById.returns(todo);
      todoModelUpdateTodo.returns(success);
      const result = await updateTodo("1", todo, todo.userId);
      expect(result).resolves.toStrictEqual(success);
      expect(todoModelUpdateTodo.getCall(0).args).toStrictEqual([todo, todo]);
      expect(todoModelGetTodoById.getCall(0).args).toStrictEqual([
        "1",
        todo.userId,
      ]);
    });
    it("should throw error if todo is not found", () => {
      const todo: ITodo = {
        id: 1,
        name: "test",
        status: STATUS.ONGOING,
        userId: 1,
      };
      todoModelGetTodoById.returns(undefined);
      expect(
        async () => await updateTodo("1", todo, todo.userId)
      ).rejects.toThrow(new NotFound("No todo found by id 1"));
    });
  });
});
