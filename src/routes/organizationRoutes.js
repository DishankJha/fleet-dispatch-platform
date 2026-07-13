import express from "express";
import {
    createOrganization,
    getOrganizations,
} from "../controllers/organizationController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";
import { validate } from "../middlewares/validate.js";
import { createOrganizationSchema } from "../validators/organizationValidator.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    validate(createOrganizationSchema),
    createOrganization
);

router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    getOrganizations
);

export default router;