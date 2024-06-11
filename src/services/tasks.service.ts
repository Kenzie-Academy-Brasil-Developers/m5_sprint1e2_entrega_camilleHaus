import { prisma } from "../database/prisma";
import { TCreateTasksBody, TCreateTasksResponse, TReadTasks, TUpdateTasks } from "../schemas/tasks.schemas";

export class TasksServices {

    async create(body: TCreateTasksBody) {
        const data = await prisma.task.create({ data: body })

        return data as TCreateTasksResponse;
    }

    async findTasks(name?: string) {
        const data = await prisma.task.findMany({
            where: {
                category: {
                    name: name
                }
            }
        });

        return data;

    }

    async findOneTask(id: number) {
        const data = await prisma.task.findFirst({
            where: { id }
        })

        return data;
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