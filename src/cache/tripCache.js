import redis from "./redis.js";

export async function cacheTrip(trip) {

    await redis.set(

        `trip:${trip.id}`,

        JSON.stringify(trip)

    );

}

export async function getCachedTrip(tripId) {

    const trip = await redis.get(`trip:${tripId}`);

    if (!trip) return null;

    return JSON.parse(trip);

}

export async function removeCachedTrip(tripId) {

    await redis.del(`trip:${tripId}`);

}