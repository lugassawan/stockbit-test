import { LogRepository } from "./../../infrastructure/repositories/log.repository";
import { AddLogCommand } from "./../../application/logging/commands/add-log.command";

export const write = async (req, res, next) => {
	const logRepository = new LogRepository();
	const commandBus = new AddLogCommand(logRepository);
	await commandBus.execute({
		method: req.method,
		pathname: req.path,
		params: req.params,
		query: req.query,
	});

	next();
};

export default { write };
