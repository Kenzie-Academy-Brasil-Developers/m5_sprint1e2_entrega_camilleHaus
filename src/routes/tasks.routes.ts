import { Router } from "express";
import { IsBodyValid } from "../middleware/isBodyValid.middleware";
import { createTasksSchema, updateTasksSchema } from "../schemas/tasks.schemas";
import { IsTaskValid } from "../middleware/isTaskValid.middleware";
import { IsCategoryBodyValid } from "../middleware/isCategoryBodyValid.middleware";
import { VerifyToken } from "../middleware/validateToken.middleware";
import { IsTaskOwner } from "../middleware/isTaskOnwer.middleware";
import { container } from "tsyringe";
import { TasksServices } from "../services/tasks.service";
import { TasksController } from "../controllers/tasks.controller";

container.registerSingleton("TasksServices", TasksServices);
const tasksControllers = container.resolve(TasksController)

export const tasksRouter = Router();

tasksRouter.use(VerifyToken.execute)

tasksRouter.post("/", IsCategoryBodyValid.execute, IsBodyValid.execute(createTasksSchema), (req, res) => tasksControllers.create(req, res));
tasksRouter.get("/", (req, res) => tasksControllers.findTasks(req, res));
tasksRouter.get("/:id", IsTaskValid.execute, IsTaskOwner.execute, (req, res) => tasksControllers.findOneTask(req, res));
tasksRouter.patch("/:id", IsTaskValid.execute, IsTaskOwner.execute, IsBodyValid.execute(updateTasksSchema), (req, res) => tasksControllers.update(req, res));
tasksRouter.delete("/:id", IsTaskValid.execute, IsTaskOwner.execute, (req, res) => tasksControllers.delete(req, res));