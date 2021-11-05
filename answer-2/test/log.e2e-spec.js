const request = require("supertest");
const app = require("../app");

describe("Log API", () => {
	describe("/logs (GET)", () => {
		test("when q field is missing", async () => {
			const res = await request(app)
				.get("/logs")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json");

			expect(res.body.data).toHaveProperty("logs");
			expect(res.body.data).toHaveProperty("links");
			expect(res.body.errors).toBeNull();
		});

		test("when page is defined and less than 1", async () => {
			const res = await request(app)
				.get("/logs")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.query({ q: "bat", page: 0 });

			expect(res.body.data).toHaveProperty("logs");
			expect(res.body.data).toHaveProperty("links");
			expect(res.body.errors).toBeNull();
		});

		test("when limit is defined and less than 1", async () => {
			const res = await request(app)
				.get("/logs")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.query({ q: "bat", page: 1, limit: 0 });

			expect(res.body.data).toHaveProperty("logs");
			expect(res.body.data).toHaveProperty("links");
			expect(res.body.errors).toBeNull();
		});

		test("when query doesnot have any related data", async () => {
			const res = await request(app)
				.get("/logs")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.query({ q: "xiuyasydis" });

			expect(res.statusCode).toEqual(404);
			expect(res.body.data).toHaveProperty("logs");
			expect(res.body.data).toHaveProperty("links");
			expect(res.body.errors).toBeNull();
		});

		test("when query have related data", async () => {
			const q = "search";

			const res = await request(app)
				.get("/logs")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.query({ q });

			expect(res.statusCode).toEqual(200);
			expect(res.body.data).toHaveProperty("logs");
			expect(res.body.data).toHaveProperty("links");
			expect(res.body.errors).toBeNull();
		});
	});
});
