import { Server } from "socket.io";

import { registerDriverSocket } from "./driverSocket.js";

let io;

export function initializeSocket(server) {

    io = new Server(server, {

        cors: {

            origin: "*",

            methods: ["GET", "POST"]

        }

    });

    registerDriverSocket(io);

    console.log("✅ Socket.IO Initialized");

    return io;

}

export function getIO() {

    if (!io) {

        throw new Error("Socket.IO not initialized");

    }

    return io;

}