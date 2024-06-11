import { Request, Response } from "express";
import { CategoriesService } from "../services/categories.service";

export class CategoriesControllers {

    private categoriesService = new CategoriesService();

    async create(req: Request, res: Response) {
        const response = await this.categoriesService.create(req.body);

        return res.status(201).json(response)
    }

    async delete(req: Request, res: Response) {
        await this.categoriesService.delete(Number(req.params.id));

        return res.status(204).json();
    }
}