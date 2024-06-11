import { prisma } from "../database/prisma";
import { TCreateCategory } from "../schemas/categories.schemas";

export class CategoriesService {

    async create(name: TCreateCategory) {
        const data = await prisma.category.create({ data: name })

        console.log(data, "#####################")

        return data;
    }

    async delete(id: number) {
        await prisma.category.delete({
            where: { id }
        })
    }
}