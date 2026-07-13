import {
    createOrganizationService,
    getOrganizationsService,
} from "../services/organizationService.js";

export async function createOrganization(req, res, next) {
    try {
        const organization = await createOrganizationService(
            req.body,
            req.user.id
        );

        return res.status(201).json({
            success: true,
            message: "Organization created successfully",
            organization,
        });
    } catch (error) {
        next(error);
    }
}

export async function getOrganizations(req, res, next) {
    try {
        const organizations = await getOrganizationsService();

        return res.status(200).json({
            success: true,
            organizations,
        });
    } catch (error) {
        next(error);
    }
}