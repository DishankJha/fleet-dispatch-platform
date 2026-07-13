import {
    createFleetService,
    getFleetsService,
} from "../services/fleetService.js";

export async function createFleet(req, res, next) {
    try {
        const fleet = await createFleetService(
            req.body,
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: "Fleet created successfully",
            fleet,
        });
    } catch (error) {
        next(error);
    }
}

export async function getFleets(req, res, next) {
    try {
        const fleets = await getFleetsService(req.user.id);

        return res.status(200).json({
            success: true,
            fleets,
        });
    } catch (error) {
        next(error);
    }
}