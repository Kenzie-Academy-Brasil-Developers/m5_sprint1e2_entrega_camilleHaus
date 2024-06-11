import { z } from "zod";

export const categoriesSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1)
});

export type TCategory = z.infer<typeof categoriesSchema>;

export const createCategorySchema = categoriesSchema.omit({ id: true });

export type TCreateCategory = z.infer<typeof createCategorySchema>;