import express from "express";

import {
    getAllDrivers,
    getUnassignedDrivers,
    assignDriver,
} from "../controllers/driverController.js";

import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.use(authenticate);

router.use(authorize("ADMIN"));

router.get("/", getAllDrivers);

router.get("/unassigned", getUnassignedDrivers);

router.patch("/:id", assignDriver);

export default router;