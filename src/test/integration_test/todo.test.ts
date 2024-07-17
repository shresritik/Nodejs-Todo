import expect from "expect";
import request from "supertest";
import express from "express";
import { STATUS } from "../../enum";
import config from "../../config";
import { expressStarter } from "../../utils/express";
describe.only("Todo integration Test Suite", () => {
  const app = express();
  expressStarter(app);
  const todo = {
    name: "test",
    status: STATUS.ONGOING,
  };
  // integration test to create a todo
  it("should create a todo", async () => {
    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${config.token.user}`)
      .send(todo);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      message: "success",
    });
  });
  // integration test to update a todo
  it("should update a todo", async () => {
    const response = await request(app)
      .put("/projects/3")
      .set("Authorization", `Bearer ${config.token.user}`)
      .send(todo);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      message: "success",
    });
  });
  // integration test to get all todo
  it("should get all todos", async () => {
    const response = await request(app)
      .get("/projects")
      .set("Authorization", `Bearer ${config.token.user}`);
    expect(response.status).toEqual(200);
  });
  // integration test to get a todo
  it("should get a todo", async () => {
    const response = await request(app)
      .get("/projects/3")
      .set("Authorization", `Bearer ${config.token.user}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ ...todo, id: 3, userId: 2 });
  });

  // integration test to delete a todo
  it("should delete a todo", async () => {
    const response = await request(app)
      .delete("/projects/3")
      .set("Authorization", `Bearer ${config.token.user}`);
    expect(response.status).toEqual(200);
  });
});
