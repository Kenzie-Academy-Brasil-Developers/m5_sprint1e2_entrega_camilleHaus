import { Router } from "express";
import { CategoriesControllers } from "../controllers/categories.controller";
import { IsBodyValid } from "../middleware/isBodyValid.middleware";
import { createCategorySchema } from "../schemas/categories.schemas";
import { IsCategoryValid } from "../middleware/isCategoryValid.middleware";
import { VerifyToken } from "../middleware/validateToken.middleware";
import { IsCategoryOwner } from "../middleware/isCategoryOwner.middleware";
import { CategoriesService } from "../services/categories.service";
import { container } from "tsyringe";

container.registerSingleton("CategoriesServices", CategoriesService);
const categoryControllers = container.resolve(CategoriesControllers)

export const categoryRouter = Router();


categoryRouter.post("/", VerifyToken.execute, IsBodyValid.execute(createCategorySchema), (req, res) => categoryControllers.create(req, res))
categoryRouter.delete("/:id", VerifyToken.execute, IsCategoryValid.execute, IsCategoryOwner.execute, (req, res) => categoryControllers.delete(req, res))