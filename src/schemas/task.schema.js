import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Tittle is required',
    }),
    description: z.string({
        required_error: "Decription is required",
    }),
    date: z.string().datetime().optional()
});
