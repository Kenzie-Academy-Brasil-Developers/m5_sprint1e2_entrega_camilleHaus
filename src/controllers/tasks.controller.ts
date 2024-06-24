import { Request, Response } from "express";
import { TasksServices } from "../services/tasks.service";
import { inject, injectable } from "tsyringe";

@injectable()
export class TasksController {

    constructor(@inject("TasksServices") private tasksServices: TasksServices) { }


    async create(req: Request, res: Response) {

        const newData = {
            ...req.body,
            userId: res.locals.decode.id
        }

        const response = await this.tasksServices.create(newData)

        return res.status(201).json(response)
    }

    async findTasks(req: Request, res: Response) {
        const { category } = req.query;

        const userId = res.locals.decode.id

        const response = await this.tasksServices.findTasks(userId, category as string);
        console.log(response)

        return res.status(200).json(response)

    }

    async findOneTask(req: Request, res: Response) {
        const response = await this.tasksServices.findOneTask(Number(req.params.id));

        return res.status(200).json(response)
    }

    async update(req: Request, res: Response) {
        const response = await this.tasksServices.update(Number(req.params.id), req.body);

        return res.status(200).json(response)
    }

    async delete(req: Request, res: Response) {
        await this.tasksServices.delete(Number(req.params.id));

        return res.status(204).json()
    }
}