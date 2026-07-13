import express from "express";
import { getUsers } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();


router.get("/", authenticate, authorize("ADMIN"), getUsers);

export default router;