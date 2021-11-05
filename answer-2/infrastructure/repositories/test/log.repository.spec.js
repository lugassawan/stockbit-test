const LogRepository = require("./../log.repository");
const db = require("../../database/models");

describe("Log Repository", () => {
	let repo;

	beforeAll(async () => {
		await db.sequelize.sync({ force: true });
	});

	beforeEach(() => {
		repo = new LogRepository();
	});

	afterAll(async () => {
		await db.sequelize.close();
	});

	describe("findAll", () => {
		test("when data based on pathname doesnot exist", async () => {
			const output = await repo.findAll({
				pathname: "/api",
				page: 1,
				limit: 10,
			});
			expect(output.results).toHaveLength(0);
			expect(output.totalLog).toBe(0);
		});

		test("when data based on pathname exists", async () => {
			const logs = Array.from({ length: 30 }).map((_, index) => ({
				method: "GET",
				pathname: index % 2 === 0 ? "/search" : "/detail/tt223",
				params: index % 2 === 0 ? {} : { id: "tt223" },
				query: index % 2 === 0 ? { q: "batman" } : {},
				created_at: new Date(),
				updated_at: new Date(),
			}));
			await db.Log.bulkCreate(logs);

			const output = await repo.findAll({
				pathname: "/search",
				page: 1,
				limit: 10,
			});
			expect(output.results).toHaveLength(10);
			expect(output.totalLog).toBe(15);
		});
	});

	describe("save", () => {
		test("when params is undefined", async () => {
			const input = {
				method: "GET",
				pathname: "/search",
				query: { q: "batman" },
			};
			const output = await repo.save(input);

			expect(output.id).toBeDefined();
			expect(output.method).toEqual(input.method);
			expect(output.pathname).toEqual(input.pathname);
			expect(output.query).toEqual(input.query);
			expect(output.params).toEqual({});
			expect(output.createdOn).toBeDefined();
		});

		test("when query is undefined", async () => {
			const input = {
				method: "GET",
				pathname: "/detail/tt1212",
				params: { id: "tt1212" },
			};
			const output = await repo.save(input);

			expect(output.id).toBeDefined();
			expect(output.method).toEqual(input.method);
			expect(output.pathname).toEqual(input.pathname);
			expect(output.query).toEqual({});
			expect(output.params).toEqual(input.params);
			expect(output.createdOn).toBeDefined();
		});

		test("when params and query are defined", async () => {
			const input = {
				method: "GET",
				pathname: "/detail/tt1212",
				params: { id: "tt1212" },
				query: {},
			};
			const output = await repo.save(input);

			expect(output.id).toBeDefined();
			expect(output.method).toEqual(input.method);
			expect(output.pathname).toEqual(input.pathname);
			expect(output.query).toEqual(input.query);
			expect(output.params).toEqual(input.params);
			expect(output.createdOn).toBeDefined();
		});
	});
});
