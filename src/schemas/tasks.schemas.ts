import { z } from "zod";
import { categoriesSchema } from "./categories.schemas";

export const readTasksSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean(),
    category: categoriesSchema.nullish(),
});

export const tasksSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().nullish()
});


export const createTasksSchema = tasksSchema.omit({ id: true, finished: true })

export const updateTasks = tasksSchema.omit({ id: true });

export const updateTasksSchema = updateTasks.partial()

export type TUpdateTasks = z.infer<typeof updateTasksSchema>;

export type TReadTasks = z.infer<typeof readTasksSchema>

export type TCreateTasksBody = z.infer<typeof createTasksSchema>

export type TCreateTasksResponse = z.infer<typeof createTasksSchema>