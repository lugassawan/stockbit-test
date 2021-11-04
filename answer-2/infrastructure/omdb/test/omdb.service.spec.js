import { OmdbService } from "./../omdb.service";

describe("Omdb Service", () => {
	let omdbService;

	beforeEach(() => {
		omdbService = new OmdbService();
	});

	describe("findAll", () => {
		test("when query is batman and it should return 10 results with total movie is not 0", async () => {
			const output = await omdbService.findAll("batman");

			expect(output.results).toHaveLength(10);
			expect(output.totalMovie).not.toBe(0);
		});

		test("when query is batman with page is 2 and it should return 10 results with total movie is not 0", async () => {
			const output = await omdbService.findAll("batman", 2);

			expect(output.results).toHaveLength(10);
			expect(output.totalMovie).not.toBe(0);
		});

		test("when query is xxxxx and it should return 0 results with total movie is 0", async () => {
			const output = await omdbService.findAll("xxxxx");

			expect(output.results).toHaveLength(0);
			expect(output.totalMovie).toBe(0);
		});

		test("when fetching omdb is error and it should return 0 results with total movie is 0", async () => {
			omdbService.__fetch = jest
				.fn()
				.mockRejectedValue(new Error("Test Error"));

			const output = await omdbService.findAll("xxxxx");

			expect(output.results).toHaveLength(0);
			expect(output.totalMovie).toBe(0);
		});

		test("when result is 1 movie but total result is NaN and it should return 1 results with total movie is 1", async () => {
			omdbService.__fetch = jest.fn().mockResolvedValue({
				data: {
					Search: [
						{
							Title: "Batman: The Killing Joke",
							Year: "2016",
							imdbID: "tt4853102",
							Type: "movie",
							Poster:
								"https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
						},
					],
					totalResults: NaN,
				},
			});

			const output = await omdbService.findAll("batman");

			expect(output.results).toHaveLength(1);
			expect(output.totalMovie).toBe(1);
		});
	});

	describe("findById", () => {
		test("when id is tt4853102 and it should an object", async () => {
			const output = await omdbService.findById("tt4853102");

			expect(output).not.toBeNull();
			expect(output).toHaveProperty("id", "tt4853102");
			expect(output).toHaveProperty("title");
			expect(output).toHaveProperty("year");
			expect(output).toHaveProperty("type");
			expect(output).toHaveProperty("poster");
		});

		test("when id is xxxxx and it should return null", async () => {
			const output = await omdbService.findById("xxxxx");

			expect(output).toBeNull();
		});

		test("when id is 'undefined' and it should return null", async () => {
			const output = await omdbService.findById(undefined);

			expect(output).toBeNull();
		});

		test("when fetching omdb is error and it should return null", async () => {
			omdbService.__fetch = jest
				.fn()
				.mockRejectedValue(new Error("Test Error"));

			const output = await omdbService.findById("tt4853102");

			expect(output).toBeNull();
		});
	});
});
