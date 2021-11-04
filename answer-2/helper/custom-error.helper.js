/**
 * Create custom error
 * @param {string} message
 * @param {object} opts
 * @param {number} opts.statusCode
 * @param {string} opts.fieldName
 * @returns {Error}
 */
export default function CustomError(message, opts) {
	const error = new Error(message);
	error.statusCode = !!opts && !!opts.statusCode ? opts.statusCode : 400;
	error.fieldName = !!opts && !!opts.fieldName ? opts.fieldName : error.name;
	return error;
}
