import express from "express";

import {
    createTrip,
    getTrips,
    startTrip,
    completeTrip,
    cancelTrip,
} from "../controllers/tripController.js";

import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";
import { validate } from "../middlewares/validate.js";

import { createTripSchema } from "../validators/tripValidator.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN"));

router.post(
    "/",
    validate(createTripSchema),
    createTrip
);

router.get("/", getTrips);

router.patch("/:id/start", startTrip);

router.patch("/:id/complete", completeTrip);

router.patch("/:id/cancel", cancelTrip);

export default router;