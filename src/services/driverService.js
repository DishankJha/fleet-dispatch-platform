import AppError from "../errors/AppError.js";

import {
    getDriversByOrganization,
    getUnassignedDrivers,
    assignDriverToFleet,
    findUserById,
} from "../repositories/userRepository.js";

import { findFleetById } from "../repositories/vehicleRepository.js";

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

    return await assignDriverToFleet(driverId, fleetId);
}