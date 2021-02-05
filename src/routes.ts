import express from "express";
import { Task } from "./TaskType";

let todos = [
  {
    id: "1",
    task: "Go to the gym",
    status: "OK",
  },
];

export class Routes {
  app = express();
  public routes(app: any): void {
    app.get("/", (_: any, res: express.Response) => {
      res.send("Hello World!");
    });

    app.get("/todos", (_: any, res: express.Response) => {
      res.send(todos);
    });

    app.get("/todo/:id", (req: express.Request, res: express.Response) => {
      const { id } = req.params;
      todos = todos.filter(
        (task: Task) => task.id.toString() !== id.toString()
      );
      res.json(todos);
    });

    app.post("/todo", (req: express.Request, res: express.Response) => {
      const task = req.body;
      todos.push(task);
      res.json(todos);
    });

    app.put("/todo", (req: express.Request, res: express.Response) => {
      const taskToUpdate = req.body;
      todos = todos.map((task: Task) =>
        task.id === taskToUpdate.id ? { ...task, ...taskToUpdate } : task
      );
      res.json(todos);
    });
  }
}
