import prisma from "../database/prisma.js";

export async function findUserByEmail(email) {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
}

export async function createUser(userData) {
    return await prisma.user.create({
        data: userData,
    });
}