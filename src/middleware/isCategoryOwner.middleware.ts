import { NextFunction, Response, Request } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";


export class IsCategoryOwner {
    static async execute (req: Request, res: Response, next: NextFunction) {
         const userId = res.locals.decode.id;

         

        

         if(res.locals.category.user.id !== userId) {
            throw new AppError(403, "This user is not the category owner")
        }

        next();
    }

}