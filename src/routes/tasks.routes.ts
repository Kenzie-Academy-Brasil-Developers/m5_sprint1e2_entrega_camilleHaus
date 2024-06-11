import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";
import { IsBodyValid } from "../middleware/isBodyValid.middleware";
import { createTasksSchema, updateTasksSchema } from "../schemas/tasks.schemas";
import { IsTaskValid } from "../middleware/isTaskValid.middleware";
import { IsCategoryBodyValid } from "../middleware/isCategoryBodyValid.middleware";

export const tasksRouter = Router();

const tasksController = new TasksController();

tasksRouter.post("/", IsCategoryBodyValid.execute, IsBodyValid.execute(createTasksSchema), tasksController.create);
tasksRouter.get("/", tasksController.findTasks);
tasksRouter.get("/:id", IsTaskValid.execute, tasksController.findOneTask);
tasksRouter.patch("/:id", IsTaskValid.execute, IsBodyValid.execute(updateTasksSchema), tasksController.update);
tasksRouter.delete("/:id", IsTaskValid.execute, tasksController.delete);