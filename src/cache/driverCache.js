import redis from "./redis.js";

const AVAILABLE_DRIVERS_KEY = "available_drivers";

export async function addAvailableDriver(driverId) {
    await redis.sAdd(AVAILABLE_DRIVERS_KEY, driverId);
}

export async function removeAvailableDriver(driverId) {
    await redis.sRem(AVAILABLE_DRIVERS_KEY, driverId);
}

export async function getRandomAvailableDriver() {
    return await redis.sRandMember(AVAILABLE_DRIVERS_KEY);
}

export async function getAllAvailableDrivers() {
    return await redis.sMembers(AVAILABLE_DRIVERS_KEY);
}

export async function updateDriverLocation(driverId, latitude, longitude) {
    await redis.hSet(`driver:${driverId}:location`, {
        latitude,
        longitude,
        updatedAt: Date.now(),
    });
}

export async function getDriverLocation(driverId) {
    return await redis.hGetAll(`driver:${driverId}:location`);
}