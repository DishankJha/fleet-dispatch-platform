import { z } from "zod";

export const createTripSchema = z.object({
    pickupLocation: z
        .string()
        .trim()
        .min(3, "Pickup location is required"),

    dropLocation: z
        .string()
        .trim()
        .min(3, "Drop location is required"),

    distance: z
        .number()
        .positive("Distance must be greater than 0"),

    fare: z
        .number()
        .positive("Fare must be greater than 0"),
});