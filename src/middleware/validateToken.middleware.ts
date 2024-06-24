import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

export class VerifyToken {
    static execute (req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization

        if (!authorization) {
            throw new AppError (401, "Token is required")
        }

        const token = authorization?.replace("Bearer ", "")

        const secret = process.env.JWT_SECRET as string

        jwt.verify(token, secret)
        res.locals.decode = jwt.decode(token)

        next()
    }
}