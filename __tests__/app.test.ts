import app from "../src/app";
import request from "supertest";
import { Task } from "../src/TaskType";

describe("Test public routes", () => {
  it("should respond with a 200 response and a 'Hello World' body in / route", () => {
    return request(app).get("/").expect(200, "Hello World!");
  });

  it("should respond with a 200 response and a list todos body in /todos route", async () => {
    const res = await request(app).get("/todos");
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it("should create new task in /todo route", async () => {
    const task: Task = {
      id: "2",
      task: "Learning IA",
      status: "NOT",
    };

    const res = await request(app).post("/todo").send(task);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it("should update a task in /todo route", async () => {
    const taskToUpdate: Task = {
      id: "2",
      task: "Learning IA",
      status: "OK",
    };

    const res = await request(app).put("/todo").send(taskToUpdate);
    const todos = res.body;
    const obj = todos.find(
      (task: Task) => task.id.toString() === taskToUpdate.id.toString()
    );

    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(2);
    expect(obj.status).toBeTruthy();
  });

  it("should return a task in /todo:id route", async () => {
    const res = await request(app).get(`/todo/${1}`);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(1);
  });
});
