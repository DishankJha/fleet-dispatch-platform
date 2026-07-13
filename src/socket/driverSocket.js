const connectedDrivers = new Map();

export function registerDriverSocket(io) {
    io.on("connection", (socket) => {

        socket.on("driver:join", (driverId) => {

            connectedDrivers.set(driverId, socket.id);

            console.log(`🚗 Driver ${driverId} connected`);

        });

        socket.on("driver:location:update", (payload) => {

            const {
                driverId,
                latitude,
                longitude
            } = payload;

            io.emit("driver:location:changed", {

                driverId,

                latitude,

                longitude,

                updatedAt: new Date()

            });

        });

        socket.on("disconnect", () => {

            for (const [driverId, socketId] of connectedDrivers.entries()) {

                if (socketId === socket.id) {

                    connectedDrivers.delete(driverId);

                    console.log(`❌ Driver ${driverId} disconnected`);

                    break;

                }

            }

        });

    });
}

export function getDriverSocket(driverId) {

    return connectedDrivers.get(driverId);

}