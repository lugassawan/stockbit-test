const LogRepository = require("./../../infrastructure/repositories/log.repository");
const GetLogsQuery = require("./../../application/logging/queries/get-logs.query");
const ResponseHelper = require("./../../helper/response.helper");

const getLogs = async (req, res) => {
	const query = req.query.q || null;
	const page =
		!!req.query.page && Number(req.query.page) > 0 ? Number(req.query.page) : 1;
	const limit =
		!!req.query.limit && Number(req.query.limit) > 0
			? Number(req.query.limit)
			: 10;

	const logRepository = new LogRepository();
	const queryBus = new GetLogsQuery(logRepository);
	const { logs, links } = await queryBus.execute(query, page, limit);

	let statusCode = logs.length > 0 ? 200 : 404;
	return ResponseHelper.toSuccess(
		res,
		{
			links,
			logs,
		},
		{ statusCode }
	);
};

module.exports = { getLogs };
