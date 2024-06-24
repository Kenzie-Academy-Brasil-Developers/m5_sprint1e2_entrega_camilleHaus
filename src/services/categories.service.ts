import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TCreateCategory } from "../schemas/categories.schemas";

@injectable()
export class CategoriesService {

    async create(name: TCreateCategory) {
        const data = await prisma.category.create({ data: name })

        return data;
    }

    async delete(id: number) {
        await prisma.category.delete({
            where: { id }
        })
    }
}