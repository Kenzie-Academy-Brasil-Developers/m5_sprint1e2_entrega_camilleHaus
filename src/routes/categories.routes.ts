import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controller";
import { IsBodyValid } from "../middleware/isBodyValid.middleware";
import { createCategorySchema } from "../schemas/categories.schemas";
import { IsCategoryValid } from "../middleware/isCategoryValid.middleware";

export const categoryRouter = Router();

const categoryController = new CategoriesControllers();

categoryRouter.post("/", IsBodyValid.execute(createCategorySchema), categoryController.create)
categoryRouter.delete("/:id", IsCategoryValid.execute, categoryController.delete)