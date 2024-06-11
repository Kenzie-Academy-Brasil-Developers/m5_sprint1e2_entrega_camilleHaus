import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";

export class IsBodyValid {
    static execute(schema: ZodSchema) {
        return (req: Request, _: Response, next: NextFunction) => {
            req.body = schema.parse(req.body)

            return next();
        }
    }
}