import { z } from "zod";

export const createTaskSchema = z.object({
    title : z.string({
        required_error: 'Title is Requrired',
    }),
    description : z.string({
        required_error: 'Description is Requrired',
    }),
    date : z.string().datetime().optional()
});