import AppError from "../errors/AppError.js";
import {
    createOrganizationWithAdmin,
    getAllOrganizations,
} from "../repositories/organizationRepository.js";
import {
    findUserById,
} from "../repositories/userRepository.js";

export async function createOrganizationService(data, userId) {
    const existingUser = await findUserById(userId);

    if (!existingUser) {
        throw new AppError("User not found", 404);
    }

    if (existingUser.organizationId) {
        throw new AppError(
            "User already belongs to an organization",
            409
        );
    }

    return await createOrganizationWithAdmin(data, userId);
}

export async function getOrganizationsService() {
    return await getAllOrganizations();
}