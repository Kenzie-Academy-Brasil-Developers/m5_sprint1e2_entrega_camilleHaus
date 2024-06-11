import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";

export const tasksRouter = Router();

const tasksController = new TasksController();

tasksRouter.post("/", tasksController.create);
tasksRouter.get("/", tasksController.findTasks);
tasksRouter.get("/:id", tasksController.findOneTask);
tasksRouter.patch("/:id", tasksController.update);
tasksRouter.delete("/:id", tasksController.delete);