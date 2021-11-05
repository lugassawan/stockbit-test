const LogRepository = require("./../../infrastructure/repositories/log.repository");
const AddLogCommand = require("./../../application/logging/commands/add-log.command");

const write = async (req, res, next) => {
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

module.exports = { write };
