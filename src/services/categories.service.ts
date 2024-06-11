import { prisma } from "../database/prisma";
import { TCategory, TCreateCategory } from "../schemas/categories.schemas";

export class CategoriesService {

    async create(name: TCreateCategory): Promise<TCategory> {
        const data = await prisma.category.create({ data: name })

        return data;
    }

    async delete(id: number) {
        await prisma.category.delete({
            where: { id }
        })
    }
}