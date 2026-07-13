import { z } from "zod";

export const createVehicleSchema = z.object({
    registrationNumber: z
        .string()
        .trim()
        .min(3, "Registration number is required")
        .max(30, "Registration number cannot exceed 30 characters"),

    model: z
        .string()
        .trim()
        .min(2, "Model is required")
        .max(100, "Model cannot exceed 100 characters"),

    capacity: z
        .number()
        .int()
        .positive("Capacity must be greater than 0"),

    fleetId: z
        .string()
        .uuid("Invalid Fleet ID"),
});