import "dotenv/config";

import express from "express";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import fleetRoutes from "./routes/fleetRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 Fleet Dispatch Platform API is running...");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/organizations", organizationRoutes);
app.use("/fleets", fleetRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/drivers", driverRoutes);
app.use("/trips", tripRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});