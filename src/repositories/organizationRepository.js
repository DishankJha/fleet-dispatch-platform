import prisma from "../database/prisma.js";

export async function createOrganization(data) {
    return await prisma.organization.create({
        data,
    });
}

export async function findOrganizationById(id) {
    return await prisma.organization.findUnique({
        where: {
            id,
        },
    });
}

export async function getAllOrganizations() {
    return await prisma.organization.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function createOrganizationWithAdmin(data, userId) {
    return await prisma.$transaction(async (tx) => {
        const organization = await tx.organization.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });

        await tx.user.update({
            where: {
                id: userId,
            },
            data: {
                organizationId: organization.id,
            },
        });

        return organization;
    });
}