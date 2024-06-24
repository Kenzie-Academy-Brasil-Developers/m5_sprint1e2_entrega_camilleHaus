import { injectable } from "tsyringe";
import { TCreateUser, TLoginReturn, TUserLogin, TUserReturn, userReturnSchema } from "../schemas/user.schemas";
import { prisma } from "../database/prisma";
import bcryptjs from "bcryptjs";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

@injectable()
export class UserServices {

    async register(body: TCreateUser): Promise<TUserReturn> {
        const hashedPassword = await bcryptjs.hash(body.password, 10)

        const newUser = {
            name: body.name,
            email: body.email,
            password: hashedPassword
        }

        const user = await prisma.user.create({ data: newUser })

        return userReturnSchema.parse(user)
    }

    async login(body: TUserLogin): Promise<TLoginReturn> {

        const user = await prisma.user.findFirst({
            where: { email: body.email }
        })

        if (!user) {
            throw new AppError(404, "User not exists")
        }

        const password = await bcryptjs.compare(body.password, user.password)

        if (!password) {
            throw new AppError(401, "Email and password doesn't match")
        }

        const secret = process.env.JWT_SECRET as string;

        const accessToken = jwt.sign({}, secret, {
            expiresIn: "1h"
        })

        return { user, accessToken }


    }

    async getUser(id: number): Promise<TUserReturn> {

        const user = await prisma.user.findFirst({
            where: { id }
        })

        return userReturnSchema.parse(user)
    }
}

