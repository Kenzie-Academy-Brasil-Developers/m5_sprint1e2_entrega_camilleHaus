import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";
import { UserServices } from "../services/users.services";

@injectable()
export class UserControllers{

    constructor(@inject("UserServices") private userServices: UserServices) {}

    async register(req: Request, res: Response): Promise<Response> {

        const create = await this.userServices.register(req.body)

        return res.status(201).json(create)
    }

    async login(req: Request, res: Response): Promise<Response> {

        const login = await this.userServices.login(req.body)

        return res.status(200).json(login)

    }

    async getUser(req: Request, res: Response): Promise<Response> {

        const { id } = res.locals.decode

        const user = await this.userServices.getUser(id)

        return res.status(200).json(user)

    }
} 