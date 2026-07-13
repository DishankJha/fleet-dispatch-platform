import {
    getDrivers,
    getAvailableDrivers,
    assignFleet,
} from "../services/driverService.js";

export async function getAllDrivers(req, res, next) {
    try {
        const drivers = await getDrivers(req.user.id);

        res.json({
            success: true,
            drivers,
        });
    } catch (err) {
        next(err);
    }
}

export async function getUnassignedDrivers(req, res, next) {
    try {
        const drivers = await getAvailableDrivers(req.user.id);

        res.json({
            success: true,
            drivers,
        });
    } catch (err) {
        next(err);
    }
}

export async function assignDriver(req, res, next) {
    try {
        const driver = await assignFleet(
            req.params.id,
            req.body.fleetId,
            req.user.id
        );

        res.json({
            success: true,
            message: "Driver assigned successfully",
            driver,
        });
    } catch (err) {
        next(err);
    }
}