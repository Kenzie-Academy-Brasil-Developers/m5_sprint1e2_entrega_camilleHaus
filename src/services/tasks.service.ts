import { injectable } from "tsyringe";
import { prisma } from "../database/prisma";
import { TCreateTasksBody, TCreateTasksResponse, TUpdateTasks, readTasksSchema } from "../schemas/tasks.schemas";

@injectable()
export class TasksServices {

    async create(body: TCreateTasksBody) {
        const data = await prisma.task.create({ data: body })

        return data as TCreateTasksResponse;
    }

    async findTasks(userId: number ,name?: string) {
        if (name) {
            const data = await prisma.task.findMany({
                where: {
                    category: {
                        name: { contains: name, mode: "insensitive" }
                    }
                },
                include: { category: true }
            });
             
            return readTasksSchema.array().parse(data)
        }

        const data = await prisma.task.findMany({
            include: { category: true },
            where: { userId }
        });

        return readTasksSchema.array().parse(data)

    }

    async findOneTask(id: number) {
        const data = await prisma.task.findFirst({
            where: { id },
            include: { category: true }
        })

        return readTasksSchema.parse(data);
    }

    async update(id: number, body: TUpdateTasks) {
        const data = await prisma.task.update({
            where: { id },
            data: body,
        })

        return data;
    }

    async delete(id: number) {
        await prisma.task.delete({
            where: { id }
        })
    }
}