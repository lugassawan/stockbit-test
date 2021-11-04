import request from "supertest";
import app from "../app";

describe("Movie API", () => {
	describe("/search (GET)", () => {
		test("when q field is missing it should return status code 422 and error message", async () => {
			const res = await request(app)
				.get("/search")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json");

			expect(res.statusCode).toEqual(422);
			expect(res.type).toBe("application/json");
			expect(res.body.data).toBeNull();
			expect(res.body.errors).toHaveLength(1);
			expect(res.body.errors[0]).toEqual({
				field: "q",
				message: "q field is missing from request query",
			});
		});

		test("when length of q string is less than 3 it should return status code 422 and error message", async () => {
			const res = await request(app)
				.get("/search")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.query({ q: "ba" });

			expect(res.statusCode).toEqual(422);
			expect(res.type).toBe("application/json");
			expect(res.body.data).toBeNull();
			expect(res.body.errors).toHaveLength(1);
			expect(res.body.errors[0]).toEqual({
				field: "q",
				message: "Minimum length of q string is 3 characters",
			});
		});

		test("when query doesnot have any related data it should return status code 404 and empty array of data", async () => {
			const res = await request(app)
				.get("/search")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.query({ q: "xiuyasydis" });

			expect(res.statusCode).toEqual(404);
			expect(res.type).toBe("application/json");
			expect(res.body.data.links).toEqual({
				first: null,
				last: null,
				next: null,
				prev: null,
			});
			expect(res.body.data.movies).toHaveLength(0);
			expect(res.body.errors).toBeNull();
		});

		test("when query have related data it should return status code 200 and links & movies data", async () => {
			const q = "batman";

			const res = await request(app)
				.get("/search")
				.set("Content-Type", "application/json")
				.set("Accept", "application/json")
				.query({ q });

			expect(res.statusCode).toEqual(200);
			expect(res.type).toBe("application/json");
			expect(res.body.data.links.first).toMatch(`/search?q=${q}&page=1`);
			expect(res.body.data.links.last).toMatch(`/search?q=${q}&page=`);
			expect(res.body.data.links.next).toMatch(`/search?q=${q}&page=2`);
			expect(res.body.data.links.prev).toBeNull();
			expect(res.body.data.movies).toHaveLength(10);
			expect(res.body.data.movies[0]).toHaveProperty("id");
			expect(res.body.data.movies[0]).toHaveProperty("title");
			expect(res.body.data.movies[0]).toHaveProperty("year");
			expect(res.body.data.movies[0]).toHaveProperty("type");
			expect(res.body.data.movies[0]).toHaveProperty("poster");
			expect(res.body.errors).toBeNull();
		});
	});

	describe.skip("/detail/:id (GET)", () => {
		/**
		 * Response
		 * - Success
		 * 		- 200
		 * 			- data : {....}
		 * 			- error : null
		 * - Error
		 * 		- 404 : data based on id not found
		 * 			- data: null
		 * 			- error: [{field, message}]
		 */
		test("when ... it should return status code ... and ...", () => {
			//
		});
	});
});
