import expect from "expect";
import request from "supertest";
import express from "express";
import { STATUS } from "../../enum";
import config from "../../config";
import { expressStarter } from "../../utils/express";
import { TodoModel } from "../../model/todos";
import sinon from "sinon";
describe("Todo integration Test Suite", () => {
  const app = express();
  expressStarter(app);
  const todo = {
    name: "test",
    status: STATUS.ONGOING,
  };
  const res = {
    name: "test",
    statusId: 2,
    userId: 1,
  };
  // integration test to create a todo
  it("should create a todo", async () => {
    let TodoModelCreateTodo: sinon.SinonStub = sinon
      .stub(TodoModel, "createTodo")
      .resolves(res);
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${config.token.user}`)
      .send(todo);
    expect(response.status).toEqual(201);
    expect(response.body).toStrictEqual(res);
    TodoModelCreateTodo.restore();
  });
  // integration test to update a todo
  it("should update a todo", async () => {
    let TodoModelGetTodoById: sinon.SinonStub = sinon
      .stub(TodoModel, "getTodoById")
      .resolves({ ...res, id: 1 });
    let TodoModelUpdateTodo: sinon.SinonStub = sinon
      .stub(TodoModel, "updateTodo")
      .resolves({ ...res, id: 1, updatedAt: new Date(), updatedBy: 1 });

    const response = await request(app)
      .put("/projects/1")
      .set("Authorization", `Bearer ${config.token.user}`)
      .send(todo);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(["name"]);
    TodoModelGetTodoById.restore();
    TodoModelUpdateTodo.restore();
  });
  // integration test to get all todo
  it("should get all todos", async () => {
    let TodoModelGetTodos: sinon.SinonStub = sinon
      .stub(TodoModel, "getAllTodos")
      .resolves([{ ...res }]);
    const response = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${config.token.user}`);
    expect(response.status).toEqual(200);
    TodoModelGetTodos.restore();
  });
  // // // integration test to get a todo
  it("should get a todo", async () => {
    let TodoModelGetTodoById: sinon.SinonStub = sinon
      .stub(TodoModel, "getTodoById")
      .resolves({ ...res, id: 1 });
    const response = await request(app)
      .get("/projects/1")
      .set("Authorization", `Bearer ${config.token.user}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(["name"]);
    TodoModelGetTodoById.restore();
  });

  // // // integration test to delete a todo
  it("should delete a todo", async () => {
    let TodoModelGetTodoById: sinon.SinonStub = sinon
      .stub(TodoModel, "getTodoById")
      .resolves({ ...res, id: 1 });
    let TodoModelDeleteTodoById: sinon.SinonStub = sinon
      .stub(TodoModel, "deleteTodo")
      .resolves(1);
    const response = await request(app)
      .delete("/projects/1")
      .set("Authorization", `Bearer ${config.token.user}`);
    expect(response.status).toEqual(200);
    TodoModelDeleteTodoById.restore();
    TodoModelGetTodoById.restore();
  });
});
