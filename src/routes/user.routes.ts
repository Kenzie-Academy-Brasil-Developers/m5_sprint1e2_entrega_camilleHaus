import { container } from "tsyringe";
import { UserServices } from "../services/users.services";
import { UserControllers } from "../controllers/user.controller";
import { Router } from "express";
import { VerifyToken } from "../middleware/validateToken.middleware";
import { IsBodyValid } from "../middleware/isBodyValid.middleware";
import { createUserSchema, userLoginSchema } from "../schemas/user.schemas";
import { IsEmailRegistered } from "../middleware/isEmailRegistered.middleware";


container.registerSingleton("UserServices", UserServices);
const userControllers = container.resolve(UserControllers);


export const userRouter = Router()

userRouter.post("/", IsBodyValid.execute(createUserSchema), IsEmailRegistered.execute, (req, res) => userControllers.register(req, res))
userRouter.post("/login", IsBodyValid.execute(userLoginSchema), (req, res) => userControllers.login(req, res))
userRouter.get("/profile", VerifyToken.execute, (req, res) => userControllers.getUser(req, res))