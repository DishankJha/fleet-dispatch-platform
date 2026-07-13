import AppError from "../errors/AppError.js";

import {
    createTripTransaction,
    getTripsByOrganization,
    findTripById,
    updateTrip,
    completeTripTransaction,
    cancelTripTransaction,
} from "../repositories/tripRepository.js";

import {
    findUserById,
} from "../repositories/userRepository.js";

import {
    findAvailableVehicle,
} from "../repositories/vehicleRepository.js";

import {
    getRandomAvailableDriver,
    removeAvailableDriver,
    addAvailableDriver,
} from "../cache/driverCache.js";

import { getIO } from "../socket/socket.js";
import { getDriverSocket } from "../socket/driverSocket.js";

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

    // Get available driver from Redis
    const driverId = await getRandomAvailableDriver();

    if (!driverId) {
        throw new AppError(
            "No available drivers found",
            400
        );
    }

    const driver = await findUserById(driverId);

    if (!driver) {
        throw new AppError(
            "Driver not found",
            404
        );
    }

    const vehicle = await findAvailableVehicle(admin.organizationId);

    if (!vehicle) {
        throw new AppError(
            "No available vehicles found",
            400
        );
    }

    const trip = await createTripTransaction({
        tripData: {
            pickupLocation: data.pickupLocation,
            dropLocation: data.dropLocation,
            distance: data.distance,
            fare: data.fare,
            organizationId: admin.organizationId,
            driverId: driver.id,
            vehicleId: vehicle.id,
            status: "ASSIGNED",
        },
        driverId: driver.id,
        vehicleId: vehicle.id,
    });

    // Remove driver from Redis available pool
    await removeAvailableDriver(driver.id);

    // Notify driver if online
    const io = getIO();
    const socketId = getDriverSocket(driver.id);

    if (socketId) {
        io.to(socketId).emit("trip:assigned", {
            message: "New trip assigned",
            trip,
        });

        console.log(`📢 Trip sent to Driver ${driver.id}`);
    } else {
        console.log(`⚠ Driver ${driver.id} is offline`);
    }

    return trip;
}

export async function getTripsService(userId) {
    const admin = await findUserById(userId);

    if (!admin) {
        throw new AppError("User not found", 404);
    }

    return await getTripsByOrganization(admin.organizationId);
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

    const completedTrip = await completeTripTransaction(tripId);

    // Add driver back to Redis pool
    if (trip.driverId) {
        await addAvailableDriver(trip.driverId);
    }

    return completedTrip;
}

export async function cancelTripService(tripId) {
    const trip = await findTripById(tripId);

    if (!trip) {
        throw new AppError("Trip not found", 404);
    }

    const cancelledTrip = await cancelTripTransaction(tripId);

    // Add driver back to Redis pool
    if (trip.driverId) {
        await addAvailableDriver(trip.driverId);
    }

    return cancelledTrip;
}