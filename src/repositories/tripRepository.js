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

/*
|--------------------------------------------------------------------------
| Transaction Methods
|--------------------------------------------------------------------------
*/

export async function createTripTransaction({
    tripData,
    driverId,
    vehicleId,
}) {
    return await prisma.$transaction(async (tx) => {
        const trip = await tx.trip.create({
            data: tripData,
            include: {
                driver: true,
                vehicle: true,
            },
        });

        await tx.user.update({
            where: {
                id: driverId,
            },
            data: {
                status: "ON_TRIP",
            },
        });

        await tx.vehicle.update({
            where: {
                id: vehicleId,
            },
            data: {
                status: "IN_SERVICE",
            },
        });

        return trip;
    });
}

export async function completeTripTransaction(tripId) {
    return await prisma.$transaction(async (tx) => {
        const trip = await tx.trip.findUnique({
            where: {
                id: tripId,
            },
        });

        if (!trip) {
            throw new Error("Trip not found");
        }

        if (trip.driverId) {
            await tx.user.update({
                where: {
                    id: trip.driverId,
                },
                data: {
                    status: "AVAILABLE",
                },
            });
        }

        if (trip.vehicleId) {
            await tx.vehicle.update({
                where: {
                    id: trip.vehicleId,
                },
                data: {
                    status: "AVAILABLE",
                },
            });
        }

        return await tx.trip.update({
            where: {
                id: tripId,
            },
            data: {
                status: "COMPLETED",
            },
            include: {
                driver: true,
                vehicle: true,
            },
        });
    });
}

export async function cancelTripTransaction(tripId) {
    return await prisma.$transaction(async (tx) => {
        const trip = await tx.trip.findUnique({
            where: {
                id: tripId,
            },
        });

        if (!trip) {
            throw new Error("Trip not found");
        }

        if (trip.driverId) {
            await tx.user.update({
                where: {
                    id: trip.driverId,
                },
                data: {
                    status: "AVAILABLE",
                },
            });
        }

        if (trip.vehicleId) {
            await tx.vehicle.update({
                where: {
                    id: trip.vehicleId,
                },
                data: {
                    status: "AVAILABLE",
                },
            });
        }

        return await tx.trip.update({
            where: {
                id: tripId,
            },
            data: {
                status: "CANCELLED",
            },
            include: {
                driver: true,
                vehicle: true,
            },
        });
    });
}