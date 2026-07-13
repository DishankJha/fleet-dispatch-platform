import prisma from "../database/prisma.js";

export async function createVehicle(data) {
    return await prisma.vehicle.create({
        data,
    });
}

export async function findVehicleByRegistrationNumber(registrationNumber) {
    return await prisma.vehicle.findUnique({
        where: {
            registrationNumber,
        },
    });
}

export async function getAllVehiclesByOrganization(organizationId) {
    return await prisma.vehicle.findMany({
        where: {
            fleet: {
                organizationId,
            },
        },
        include: {
            fleet: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function findFleetById(fleetId) {
    return await prisma.fleet.findUnique({
        where: {
            id: fleetId,
        },
    });
}

export async function findAvailableVehicle(organizationId) {
    return await prisma.vehicle.findFirst({
        where: {
            status: "AVAILABLE",
            fleet: {
                organizationId,
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

export async function updateVehicleStatus(vehicleId, status) {
    return await prisma.vehicle.update({
        where: {
            id: vehicleId,
        },
        data: {
            status,
        },
    });
}