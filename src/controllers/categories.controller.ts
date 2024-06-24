import { Request, Response } from "express";
import { CategoriesService } from "../services/categories.service";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoriesControllers {

    constructor(@inject("CategoriesServices") private categoriesServices: CategoriesService) {}


    async create(req: Request, res: Response) {

        const newData = {
            ...req.body,
            userId: res.locals.decode.id
        }

        const response = await this.categoriesServices.create(newData);

        return res.status(201).json(response)
    }

    async delete(req: Request, res: Response) {

        await this.categoriesServices.delete(Number(req.params.id));

        return res.status(204).json();
    }
}