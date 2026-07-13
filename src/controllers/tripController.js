import {
    createTripService,
    getTripsService,
    startTripService,
    completeTripService,
    cancelTripService,
} from "../services/tripService.js";

export async function createTrip(req, res, next) {
    try {
        const trip = await createTripService(
            req.body,
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: "Trip created successfully",
            trip,
        });
    } catch (err) {
        next(err);
    }
}

export async function getTrips(req, res, next) {
    try {
        const trips = await getTripsService(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            trips,
        });
    } catch (err) {
        next(err);
    }
}

export async function startTrip(req, res, next) {
    try {
        const trip = await startTripService(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Trip started",
            trip,
        });
    } catch (err) {
        next(err);
    }
}

export async function completeTrip(req, res, next) {
    try {
        const trip = await completeTripService(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Trip completed",
            trip,
        });
    } catch (err) {
        next(err);
    }
}

export async function cancelTrip(req, res, next) {
    try {
        const trip = await cancelTripService(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Trip cancelled",
            trip,
        });
    } catch (err) {
        next(err);
    }
}