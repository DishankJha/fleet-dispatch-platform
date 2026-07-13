import request from "supertest";
import app from "../src/app.js";

describe("Authentication", () => {

    test("GET / should return 200", async () => {

        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);

    });

});