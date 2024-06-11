import { Request, Response } from "express";
import { TasksServices } from "../services/tasks.service";

export class TasksController {


    async create(req: Request, res: Response) {
        const tasksServices = new TasksServices();

        const response = await tasksServices.create(req.body)

        return res.status(201).json(response)

    }

    async findTasks(req: Request, res: Response) {
        const tasksServices = new TasksServices();
        const { category } = req.query;

        const response = await tasksServices.findTasks(category as string);

        return res.status(200).json(response)
    }

    async findOneTask(req: Request, res: Response) {
        const tasksServices = new TasksServices();
        const response = await tasksServices.findOneTask(Number(req.params.id));

        return res.status(200).json(response)
    }

    async update(req: Request, res: Response) {
        const tasksServices = new TasksServices();
        const response = await tasksServices.update(Number(req.params.id), req.body);

        return res.status(200).json(response)
    }

    async delete(req: Request, res: Response) {
        const tasksServices = new TasksServices();
        await tasksServices.delete(Number(req.params.id));

        return res.status(204).json()
    }
}