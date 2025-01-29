import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title must not be empty"),
  description: z
    .string()
    .trim()
    .min(5, "Description must contain at least 5 characters"),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
