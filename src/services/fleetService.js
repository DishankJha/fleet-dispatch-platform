import AppError from "../errors/AppError.js";

import {
    createFleet,
    findFleetByName,
    getAllFleets,
} from "../repositories/fleetRepository.js";

import { findUserById } from "../repositories/userRepository.js";

export async function createFleetService(data, userId) {
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

    const existingFleet = await findFleetByName(
        data.name,
        user.organizationId
    );

    if (existingFleet) {
        throw new AppError(
            "Fleet with this name already exists",
            409
        );
    }

    return await createFleet({
        name: data.name,
        description: data.description,
        organizationId: user.organizationId,
    });
}

export async function getFleetsService(userId) {
    const user = await findUserById(userId);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    return await getAllFleets(user.organizationId);
}