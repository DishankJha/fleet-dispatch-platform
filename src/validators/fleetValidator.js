import { z } from "zod";

export const createFleetSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Fleet name must be at least 3 characters")
        .max(100, "Fleet name cannot exceed 100 characters"),

    description: z
        .string()
        .trim()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
});