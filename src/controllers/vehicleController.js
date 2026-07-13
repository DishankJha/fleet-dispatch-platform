import {
    createVehicleService,
    getVehiclesService,
} from "../services/vehicleService.js";

export async function createVehicle(req, res, next) {
    try {
        const vehicle = await createVehicleService(
            req.body,
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            vehicle,
        });
    } catch (error) {
        next(error);
    }
}

export async function getVehicles(req, res, next) {
    try {
        const vehicles = await getVehiclesService(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            vehicles,
        });
    } catch (error) {
        next(error);
    }
}