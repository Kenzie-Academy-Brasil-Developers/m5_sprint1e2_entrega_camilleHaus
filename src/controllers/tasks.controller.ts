import { Request, Response } from "express";
import { TasksServices } from "../services/tasks.service";

export class TasksController {

    private tasksServices = new TasksServices();

    async create(req: Request, res: Response) {
        const response = await this.tasksServices.create(req.body)

        return res.status(201).json(response)

    }

    async findTasks(req: Request, res: Response) {
        const { name } = req.query;

        const response = await this.tasksServices.findTasks(name as string);

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