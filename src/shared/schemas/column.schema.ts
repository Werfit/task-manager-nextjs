import { z } from "zod";

const patternHEX = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

export const createColumnSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Column name must be at least 2 characters long"),
  color: z.string().trim().regex(patternHEX, "Invalid color"),
});

export type CreateColumnSchema = z.infer<typeof createColumnSchema>;
