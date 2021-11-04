import { SearchMovieQuery } from "./../search-movie.query";

describe("Search Movie Query", () => {
	describe("execute", () => {
		test("when query is batman and page is 2", async () => {
			const omdbService = {
				findAll: jest.fn().mockResolvedValue({
					results: [
						{
							title: "Batman: The Killing Joke",
							year: "2016",
							id: "tt4853102",
							type: "movie",
							poster:
								"https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
						},
					],
					totalMovie: 40,
				}),
			};

			const queryBus = new SearchMovieQuery(omdbService);
			const output = await queryBus.execute("batman", 2);
			expect(output.movies).toHaveLength(1);
			expect(output.movies[0]).toEqual({
				title: "Batman: The Killing Joke",
				year: "2016",
				id: "tt4853102",
				type: "movie",
				poster:
					"https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
			});
			expect(output.links).toEqual({
				first: "/search?q=batman&page=1",
				last: "/search?q=batman&page=4",
				next: "/search?q=batman&page=3",
				prev: "/search?q=batman&page=1",
			});
		});

		test("when query is batman and page is 4", async () => {
			const omdbService = {
				findAll: jest.fn().mockResolvedValue({
					results: [
						{
							title: "Batman: The Killing Joke",
							year: "2016",
							id: "tt4853102",
							type: "movie",
							poster:
								"https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
						},
					],
					totalMovie: 40,
				}),
			};

			const queryBus = new SearchMovieQuery(omdbService);
			const output = await queryBus.execute("batman", 4);
			expect(output.movies).toHaveLength(1);
			expect(output.movies[0]).toEqual({
				title: "Batman: The Killing Joke",
				year: "2016",
				id: "tt4853102",
				type: "movie",
				poster:
					"https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
			});
			expect(output.links).toEqual({
				first: "/search?q=batman&page=1",
				last: "/search?q=batman&page=4",
				next: null,
				prev: "/search?q=batman&page=3",
			});
		});

		test("when query is batman and page is 1", async () => {
			const omdbService = {
				findAll: jest.fn().mockResolvedValue({
					results: [
						{
							title: "Batman: The Killing Joke",
							year: "2016",
							id: "tt4853102",
							type: "movie",
							poster:
								"https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
						},
					],
					totalMovie: 40,
				}),
			};

			const queryBus = new SearchMovieQuery(omdbService);
			const output = await queryBus.execute("batman", 1);
			expect(output.movies).toHaveLength(1);
			expect(output.movies[0]).toEqual({
				title: "Batman: The Killing Joke",
				year: "2016",
				id: "tt4853102",
				type: "movie",
				poster:
					"https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
			});
			expect(output.links).toEqual({
				first: "/search?q=batman&page=1",
				last: "/search?q=batman&page=4",
				next: "/search?q=batman&page=2",
				prev: null,
			});
		});

		test("when query is xxxx and page is 2", async () => {
			const omdbService = {
				findAll: jest.fn().mockResolvedValue({
					results: [],
					totalMovie: 0,
				}),
			};

			const queryBus = new SearchMovieQuery(omdbService);
			const output = await queryBus.execute("batman", 2);
			expect(output.movies).toHaveLength(0);
			expect(output.links).toEqual({
				first: null,
				last: null,
				next: null,
				prev: null,
			});
		});
	});
});
