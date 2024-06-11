import { z } from "zod";
import { categoriesSchema } from "./categories.schemas";

export const readTasksSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean(),
    category: categoriesSchema,
});

export const createTasksSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean(),
    categoryId: z.number()
});


const createTasks = createTasksSchema.omit({ id: true, finished: true})

const updateTasks = createTasksSchema.omit({ finished: true });

export type TUpdateTasks = z.infer<typeof updateTasks>;

export type TReadTasks = z.infer<typeof readTasksSchema>

export type TCreateTasksBody = z.infer<typeof createTasks>

export type TCreateTasksResponse = z.infer<typeof createTasksSchema>