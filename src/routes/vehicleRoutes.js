import express from "express";

import {
    createVehicle,
    getVehicles,
} from "../controllers/vehicleController.js";

import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";
import { validate } from "../middlewares/validate.js";

import { createVehicleSchema } from "../validators/vehicleValidator.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createVehicleSchema),
    createVehicle
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    getVehicles
);

export default router;