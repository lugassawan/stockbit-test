const GetLogsQuery = require("../get-logs.query");

describe("Get Logs Query", () => {
	describe("execute", () => {
		test("when query, page & limit are undefined", async () => {
			const dt = new Date();
			const data = {
				id: 1,
				method: "GET",
				pathname: "/search",
				param: {},
				query: { q: "batman" },
				createdOn: dt,
			};

			const logRepo = {
				findAll: jest.fn().mockResolvedValue({
					results: [data],
					totalLog: 40,
				}),
			};

			const queryBus = new GetLogsQuery(logRepo);
			const output = await queryBus.execute();

			expect(output.logs).toHaveLength(1);
			expect(output.logs[0]).toEqual(data);
			expect(output.links).toEqual({
				first: `/logs?page=1&limit=10`,
				last: `/logs?page=4&limit=10`,
				next: `/logs?page=2&limit=10`,
				prev: null,
			});
			expect(logRepo.findAll).toHaveBeenCalledTimes(1);
		});

		test("when query is search but page & limit are undefined", async () => {
			const dt = new Date();
			const data = {
				id: 1,
				method: "GET",
				pathname: "/search",
				param: {},
				query: { q: "batman" },
				createdOn: dt,
			};

			const logRepo = {
				findAll: jest.fn().mockResolvedValue({
					results: [data],
					totalLog: 40,
				}),
			};

			const queryBus = new GetLogsQuery(logRepo);
			const output = await queryBus.execute("search");

			expect(output.logs).toHaveLength(1);
			expect(output.logs[0]).toEqual(data);
			expect(output.links).toEqual({
				first: `/logs?q=search&page=1&limit=10`,
				last: `/logs?q=search&page=4&limit=10`,
				next: `/logs?q=search&page=2&limit=10`,
				prev: null,
			});
			expect(logRepo.findAll).toHaveBeenCalledTimes(1);
		});

		test("when query is search & page is 1 but limit are undefined", async () => {
			const dt = new Date();
			const data = {
				id: 1,
				method: "GET",
				pathname: "/search",
				param: {},
				query: { q: "batman" },
				createdOn: dt,
			};

			const logRepo = {
				findAll: jest.fn().mockResolvedValue({
					results: [data],
					totalLog: 40,
				}),
			};

			const queryBus = new GetLogsQuery(logRepo);
			const output = await queryBus.execute("search", 1);

			expect(output.logs).toHaveLength(1);
			expect(output.logs[0]).toEqual(data);
			expect(output.links).toEqual({
				first: `/logs?q=search&page=1&limit=10`,
				last: `/logs?q=search&page=4&limit=10`,
				next: `/logs?q=search&page=2&limit=10`,
				prev: null,
			});
			expect(logRepo.findAll).toHaveBeenCalledTimes(1);
		});

		test("when query is search, page is 1 & limit is 20", async () => {
			const dt = new Date();
			const data = {
				id: 1,
				method: "GET",
				pathname: "/search",
				param: {},
				query: { q: "batman" },
				createdOn: dt,
			};

			const logRepo = {
				findAll: jest.fn().mockResolvedValue({
					results: [data],
					totalLog: 40,
				}),
			};

			const queryBus = new GetLogsQuery(logRepo);
			const output = await queryBus.execute("search", 1, 20);

			expect(output.logs).toHaveLength(1);
			expect(output.logs[0]).toEqual(data);
			expect(output.links).toEqual({
				first: `/logs?q=search&page=1&limit=20`,
				last: `/logs?q=search&page=2&limit=20`,
				next: `/logs?q=search&page=2&limit=20`,
				prev: null,
			});
			expect(logRepo.findAll).toHaveBeenCalledTimes(1);
		});

		test("when results length & total log are 0", async () => {
			const logRepo = {
				findAll: jest.fn().mockResolvedValue({
					results: [],
					totalLog: 0,
				}),
			};

			const queryBus = new GetLogsQuery(logRepo);
			const output = await queryBus.execute();

			expect(output.logs).toHaveLength(0);
			expect(output.links).toEqual({
				first: null,
				last: null,
				next: null,
				prev: null,
			});
			expect(logRepo.findAll).toHaveBeenCalledTimes(1);
		});

		test("when page is same with total page", async () => {
			const dt = new Date();
			const data = {
				id: 1,
				method: "GET",
				pathname: "/search",
				param: {},
				query: { q: "batman" },
				createdOn: dt,
			};

			const logRepo = {
				findAll: jest.fn().mockResolvedValue({
					results: [data],
					totalLog: 40,
				}),
			};

			const queryBus = new GetLogsQuery(logRepo);
			const output = await queryBus.execute("search", 4);

			expect(output.logs).toHaveLength(1);
			expect(output.logs[0]).toEqual(data);
			expect(output.links).toEqual({
				first: `/logs?q=search&page=1&limit=10`,
				last: `/logs?q=search&page=4&limit=10`,
				next: null,
				prev: `/logs?q=search&page=3&limit=10`,
			});
			expect(logRepo.findAll).toHaveBeenCalledTimes(1);
		});
	});
});
