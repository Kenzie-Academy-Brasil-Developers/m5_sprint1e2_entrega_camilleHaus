import { z } from "zod";


export const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string()
});

export type TUser = z.infer<typeof userSchema>

export const createUserSchema = userSchema.omit({id: true});
export type TCreateUser = z.infer<typeof createUserSchema>

export const userReturnSchema = userSchema.omit({password: true});
export type TUserReturn = z.infer<typeof userReturnSchema>

export const userLoginSchema = createUserSchema.omit({name: true});
export type TUserLogin = z.infer<typeof userLoginSchema>

export type TLoginReturn = {
    accessToken: string;
    user: TUserReturn
}

