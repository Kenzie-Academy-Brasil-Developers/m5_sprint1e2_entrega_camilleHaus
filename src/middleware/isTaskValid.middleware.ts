import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsTaskValid {
    static async execute(req: Request, res: Response, next: NextFunction) {

        const id = req.params.id;

        const task = await prisma.task.findFirst({
            where: { id: Number(id) },
            include: { user: true }
        })

        res.locals.task = task

        if (!task) {
            throw new AppError(404, "Task not found")
        }

        next();
    }
}