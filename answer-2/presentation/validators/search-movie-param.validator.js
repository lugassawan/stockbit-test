const ResponseHelper = require("./../../helper/response.helper");

const validate = (req, res, next) => {
	const statusCode = 422;

	if (!req.query.q) {
		return ResponseHelper.toFail(
			res,
			[{ field: "q", message: "q field is missing from request query" }],
			{ statusCode }
		);
	}

	if (req.query.q.length < 3) {
		return ResponseHelper.toFail(
			res,
			[
				{
					field: "q",
					message: "Minimum length of q string is 3 characters",
				},
			],
			{ statusCode }
		);
	}

	if (!!req.query.page && req.query.page < 1) {
		return ResponseHelper.toFail(
			res,
			[
				{
					field: "page",
					message: "The page specified may not be zero or negative",
				},
			],
			{ statusCode }
		);
	}

	next();
};

module.exports = { validate };
