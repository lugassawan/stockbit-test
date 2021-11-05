import { AddLogCommand } from "./../add-log.command";

describe("Add Log Command", () => {
	describe("execute", () => {
		test("when endpoint is /search?q=batman", async () => {
			const dt = new Date();
			const data = {
				method: "GET",
				pathname: "/search",
				param: {},
				query: { q: "batman" },
			};

			const logRepo = {
				save: jest.fn().mockResolvedValue({
					id: 1,
					createdOn: dt,
					...data,
				}),
			};

			const commandBus = new AddLogCommand(logRepo);
			const output = await commandBus.execute(data);

			expect(output).toBeUndefined();
			expect(logRepo.save).toHaveBeenCalledTimes(1);
		});
	});
});
