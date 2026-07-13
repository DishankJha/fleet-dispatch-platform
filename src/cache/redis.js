import { createClient } from "redis";

const client = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});

client.on("error", (err) => {
    console.error("Redis Error:", err);
});

await client.connect();

console.log("✅ Redis Connected");

export default client;