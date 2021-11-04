import request from "supertest";
import app from "../app";

describe("Home API", () => {
	describe("/ (GET)", () => {
		test("when visit home it should return status code 200 and data", async () => {
			const res = await request(app)
				.get("/")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json");

			expect(res.statusCode).toEqual(200);
			expect(res.type).toBe("application/json");
			expect(res.body.data).toEqual({
				hostname: "127.0.0.1",
				message: "Hello, this is entry point",
			});
			expect(res.body.errors).toBeNull();
		});
	});
});
