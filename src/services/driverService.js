import AppError from "../errors/AppError.js";

import {
    getDriversByOrganization,
    getUnassignedDrivers,
    assignDriverToFleet,
    findUserById,
} from "../repositories/userRepository.js";

import { findFleetById } from "../repositories/vehicleRepository.js";

import {
    addAvailableDriver,
    removeAvailableDriver,
} from "../cache/driverCache.js";

export async function getDrivers(userId) {
    const admin = await findUserById(userId);

    if (!admin) {
        throw new AppError("User not found", 404);
    }

    return await getDriversByOrganization(admin.organizationId);
}

export async function getAvailableDrivers(userId) {
    const admin = await findUserById(userId);

    if (!admin) {
        throw new AppError("User not found", 404);
    }

    return await getUnassignedDrivers(admin.organizationId);
}

export async function assignFleet(driverId, fleetId, adminId) {
    const admin = await findUserById(adminId);

    if (!admin) {
        throw new AppError("Admin not found", 404);
    }

    const driver = await findUserById(driverId);

    if (!driver) {
        throw new AppError("Driver not found", 404);
    }

    const fleet = await findFleetById(fleetId);

    if (!fleet) {
        throw new AppError("Fleet not found", 404);
    }

    if (fleet.organizationId !== admin.organizationId) {
        throw new AppError(
            "Fleet belongs to another organization",
            403
        );
    }

    const updatedDriver = await assignDriverToFleet(driverId, fleetId);

    await addAvailableDriver(driverId);

    return updatedDriver;
}

export async function removeDriverFromAvailability(driverId) {
    await removeAvailableDriver(driverId);
}