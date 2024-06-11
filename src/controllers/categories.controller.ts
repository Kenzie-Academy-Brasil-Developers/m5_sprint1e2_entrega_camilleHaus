import { Request, Response } from "express";
import { CategoriesService } from "../services/categories.service";

export class CategoriesControllers {


    async create(req: Request, res: Response) {
        const categoriesService = new CategoriesService();

        const response = await categoriesService.create(req.body);

        return res.status(201).json(response)
    }

    async delete(req: Request, res: Response) {
        const categoriesService = new CategoriesService();

        await categoriesService.delete(Number(req.params.id));

        return res.status(204).json();
    }
}