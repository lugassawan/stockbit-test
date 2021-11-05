const { Op } = require("sequelize");
const db = require("../database/models");
const stringHelper = require("../../helper/string.helper");

module.exports = class LogRepository {
	constructor() {
		this.model = db.Log;
	}

	async findAll({ pathname, page, limit }) {
		const escape = stringHelper.escape(pathname);
		const numOfItemForPage = limit * page;
		const offset = numOfItemForPage - limit;

		const { count, rows } = await this.model.findAndCountAll({
			where: {
				pathname: { [Op.like]: `%${escape}%` },
			},
			order: [["createdAt", "DESC"]],
			offset,
			limit,
		});

		return { results: rows.map(this.__toEntity), totalLog: count };
	}

	async save({ method, pathname, params, query }) {
		const paramsTxt = JSON.stringify(!!params ? params : {});
		const queryTxt = JSON.stringify(!!query ? query : {});
		const logData = await this.model.create({
			method: method.toUpperCase(),
			pathname,
			params: paramsTxt,
			query: queryTxt,
		});

		return this.__toEntity(logData);
	}

	__toEntity(data) {
		return {
			id: data.id,
			method: data.method,
			pathname: data.pathname,
			params: JSON.parse(data.params),
			query: JSON.parse(data.query),
			createdOn: data.createdAt,
		};
	}
};
