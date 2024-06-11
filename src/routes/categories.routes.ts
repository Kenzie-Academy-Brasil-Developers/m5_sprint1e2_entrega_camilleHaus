import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controller";

export const categoryRouter = Router();

const categoryController = new CategoriesControllers();

categoryRouter.post("/", categoryController.create)
categoryRouter.delete("/:id", categoryController.delete)