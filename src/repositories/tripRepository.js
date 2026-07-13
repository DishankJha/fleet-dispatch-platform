import prisma from "../database/prisma.js";

export async function createTrip(data) {
    return await prisma.trip.create({
        data,
        include: {
            driver: true,
            vehicle: true,
        },
    });
}

export async function getTripsByOrganization(organizationId) {
    return await prisma.trip.findMany({
        where: {
            organizationId,
        },
        include: {
            driver: true,
            vehicle: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function findTripById(id) {
    return await prisma.trip.findUnique({
        where: {
            id,
        },
        include: {
            driver: true,
            vehicle: true,
        },
    });
}

export async function updateTrip(id, data) {
    return await prisma.trip.update({
        where: {
            id,
        },
        data,
        include: {
            driver: true,
            vehicle: true,
        },
    });
}