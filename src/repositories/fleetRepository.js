import prisma from "../database/prisma.js";

export async function createFleet(data) {
    return await prisma.fleet.create({
        data,
    });
}

export async function findFleetByName(name, organizationId) {
    return await prisma.fleet.findFirst({
        where: {
            name,
            organizationId,
        },
    });
}

export async function getAllFleets(organizationId) {
    return await prisma.fleet.findMany({
        where: {
            organizationId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}