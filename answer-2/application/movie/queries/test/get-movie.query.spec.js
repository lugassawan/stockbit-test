import { GetMovieQuery } from "./../get-movie.query";

describe("Get Movie Query", () => {
	describe("execute", () => {
		test("when id is tt4853102", async () => {
			const omdbService = {
				findById: jest.fn().mockResolvedValue({
					title: "Batman: The Killing Joke",
					year: "2016",
					id: "tt4853102",
					type: "movie",
					poster:
						"https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
				}),
			};

			const queryBus = new GetMovieQuery(omdbService);
			const output = await queryBus.execute("tt4853102");

			expect(output.movie).toEqual({
				title: "Batman: The Killing Joke",
				year: "2016",
				id: "tt4853102",
				type: "movie",
				poster:
					"https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
			});
			expect(output.message).toBeNull();
			expect(omdbService.findById).toHaveBeenCalledTimes(1);
		});

		test("when id is xxxx", async () => {
			const omdbService = {
				findById: jest.fn().mockResolvedValue(null),
			};

			const queryBus = new GetMovieQuery(omdbService);
			const output = await queryBus.execute("xxxx");

			expect(output.movie).toBeNull();
			expect(output.message).toBe("Data is not found for ID xxxx");
			expect(omdbService.findById).toHaveBeenCalledTimes(1);
		});
	});
});
