import AppError from "../errors/AppError.js";

import {
    createTrip,
    getTripsByOrganization,
    findTripById,
    updateTrip,
} from "../repositories/tripRepository.js";

import {
    findAvailableDriver,
    updateDriverStatus,
    findUserById,
} from "../repositories/userRepository.js";

import {
    findAvailableVehicle,
    updateVehicleStatus,
} from "../repositories/vehicleRepository.js";

export async function createTripService(data, userId) {
    const admin = await findUserById(userId);

    if (!admin) {
        throw new AppError("User not found", 404);
    }

    if (!admin.organizationId) {
        throw new AppError(
            "User does not belong to any organization",
            400
        );
    }

    const driver = await findAvailableDriver(admin.organizationId);

    if (!driver) {
        throw new AppError(
            "No available drivers found",
            400
        );
    }

    const vehicle = await findAvailableVehicle(admin.organizationId);

    if (!vehicle) {
        throw new AppError(
            "No available vehicles found",
            400
        );
    }

    const trip = await createTrip({
        pickupLocation: data.pickupLocation,
        dropLocation: data.dropLocation,
        distance: data.distance,
        fare: data.fare,

        organizationId: admin.organizationId,

        driverId: driver.id,
        vehicleId: vehicle.id,

        status: "ASSIGNED",
    });

    await updateDriverStatus(driver.id, "ON_TRIP");

    await updateVehicleStatus(vehicle.id, "IN_SERVICE");

    return trip;
}

export async function getTripsService(userId) {
    const admin = await findUserById(userId);

    if (!admin) {
        throw new AppError("User not found", 404);
    }

    return await getTripsByOrganization(
        admin.organizationId
    );
}

export async function startTripService(tripId) {
    const trip = await findTripById(tripId);

    if (!trip) {
        throw new AppError("Trip not found", 404);
    }

    if (trip.status !== "ASSIGNED") {
        throw new AppError(
            "Trip cannot be started",
            400
        );
    }

    return await updateTrip(tripId, {
        status: "IN_PROGRESS",
    });
}

export async function completeTripService(tripId) {
    const trip = await findTripById(tripId);

    if (!trip) {
        throw new AppError("Trip not found", 404);
    }

    if (trip.status !== "IN_PROGRESS") {
        throw new AppError(
            "Trip is not in progress",
            400
        );
    }

    await updateDriverStatus(
        trip.driverId,
        "AVAILABLE"
    );

    await updateVehicleStatus(
        trip.vehicleId,
        "AVAILABLE"
    );

    return await updateTrip(tripId, {
        status: "COMPLETED",
    });
}

export async function cancelTripService(tripId) {
    const trip = await findTripById(tripId);

    if (!trip) {
        throw new AppError("Trip not found", 404);
    }

    if (trip.driverId) {
        await updateDriverStatus(
            trip.driverId,
            "AVAILABLE"
        );
    }

    if (trip.vehicleId) {
        await updateVehicleStatus(
            trip.vehicleId,
            "AVAILABLE"
        );
    }

    return await updateTrip(tripId, {
        status: "CANCELLED",
    });
}