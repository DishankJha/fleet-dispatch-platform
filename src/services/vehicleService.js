import AppError from "../errors/AppError.js";

import { findUserById } from "../repositories/userRepository.js";

import {
    createVehicle,
    findVehicleByRegistrationNumber,
    getAllVehiclesByOrganization,
    findFleetById,
} from "../repositories/vehicleRepository.js";

export async function createVehicleService(data, userId) {
    const user = await findUserById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.organizationId) {
        throw new AppError(
            "User does not belong to any organization",
            400
        );
    }

    const fleet = await findFleetById(data.fleetId);

    if (!fleet) {
        throw new AppError("Fleet not found", 404);
    }

    if (fleet.organizationId !== user.organizationId) {
        throw new AppError(
            "Fleet does not belong to your organization",
            403
        );
    }

    const existingVehicle =
        await findVehicleByRegistrationNumber(
            data.registrationNumber
        );

    if (existingVehicle) {
        throw new AppError(
            "Vehicle with this registration number already exists",
            409
        );
    }

    return await createVehicle(data);
}

export async function getVehiclesService(userId) {
    const user = await findUserById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.organizationId) {
        throw new AppError(
            "User does not belong to any organization",
            400
        );
    }

    return await getAllVehiclesByOrganization(
        user.organizationId
    );
}