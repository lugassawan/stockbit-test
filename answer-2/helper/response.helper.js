module.exports = class ResponseHelper {
	/**
	 * Return response as success case
	 * @param {Express.Response} res
	 * @param {any} data
	 * @param {object} opts
	 * @param {number} opts.statusCode
	 * @returns {Express.Response}
	 */
	static toSuccess(res, data, opts) {
		const statusCode = !!opts && !!opts.statusCode ? opts.statusCode : 200;
		return this.__asJSON(res, statusCode, data);
	}

	/**
	 * Return response as fail case
	 * @param {Express.Response} res
	 * @param {array} errors
	 * @param {object} opts
	 * @param {number} opts.statusCode
	 * @returns {Express.Response}
	 */
	static toFail(res, errors, opts) {
		const statusCode = !!opts && !!opts.statusCode ? opts.statusCode : 400;
		return this.__asJSON(res, statusCode, null, errors);
	}

	static __asJSON(res, statusCode, data = null, errors = null) {
		return res.status(statusCode).json({
			data,
			errors,
		});
	}
};
