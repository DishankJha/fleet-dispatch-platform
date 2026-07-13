import express from "express";

import {
    createFleet,
    getFleets,
} from "../controllers/fleetController.js";

import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";
import { validate } from "../middlewares/validate.js";

import { createFleetSchema } from "../validators/fleetValidator.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createFleetSchema),
    createFleet
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    getFleets
);

export default router;