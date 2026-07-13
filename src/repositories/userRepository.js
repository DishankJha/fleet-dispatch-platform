import prisma from "../database/prisma.js";

export async function getAllUsers() {
    return await prisma.user.findMany();
}

export async function findUserById(id) {
    return await prisma.user.findUnique({
        where: {
            id,
        },
    });
}

export async function updateUserOrganization(userId, organizationId) {
    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            organizationId,
        },
    });
}

export async function getDriversByOrganization(organizationId) {
    return await prisma.user.findMany({
        where: {
            organizationId,
            role: "DRIVER",
        },
        include: {
            fleet: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getUnassignedDrivers(organizationId) {
    return await prisma.user.findMany({
        where: {
            organizationId,
            role: "DRIVER",
            fleetId: null,
        },
    });
}

export async function assignDriverToFleet(driverId, fleetId) {
    return await prisma.user.update({
        where: {
            id: driverId,
        },
        data: {
            fleetId,
        },
    });
}

export async function findAvailableDriver(organizationId) {
    return await prisma.user.findFirst({
        where: {
            organizationId,
            role: "DRIVER",
            status: "AVAILABLE",
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

export async function updateDriverStatus(driverId, status) {
    return await prisma.user.update({
        where: {
            id: driverId,
        },
        data: {
            status,
        },
    });
}