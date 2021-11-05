import { Op } from "sequelize";
import models from "../database/models";
import stringHelper from "../../helper/string.helper";

export class LogRepository {
	constructor() {
		this.model = models.Log;
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
		const logData = await this.model.create({
			method: method.toUpperCase(),
			pathname,
			params: !!params ? params : {},
			query: !!query ? query : {},
		});

		return this.__toEntity(logData);
	}

	__toEntity(data) {
		return {
			id: data.id,
			method: data.method,
			pathname: data.pathname,
			params: data.params,
			query: data.query,
			createdOn: data.createdAt,
		};
	}
}