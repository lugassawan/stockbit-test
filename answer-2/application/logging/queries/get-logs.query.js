export class GetLogsQuery {
	constructor(logRepository) {
		this.logRepository = logRepository;
	}

	async execute(query, page, limit) {
		const condition = {
			pathname: !!query ? query : null,
			page: Number(page) || 1,
			limit: !!limit && Number(limit) > 0 ? Number(limit) : 10,
		};

		const { results, totalLog } = await this.logRepository.findAll(condition);

		const links = {
			first: null,
			last: null,
			next: null,
			prev: null,
		};

		if (totalLog > 0) {
			const totalPage = Math.ceil(totalLog / condition.limit);
			let baseLink = "/logs?";
			const limitLink = "&limit=" + condition.limit;

			if (condition.pathname) {
				baseLink += `q=${condition.pathname}&`;
			}

			baseLink += "page=";
			links.first = baseLink + "1" + limitLink;
			links.last = baseLink + totalPage + limitLink;

			if (condition.page < totalPage) {
				links.next = baseLink + (condition.page + 1) + limitLink;
			}

			if (condition.page > 1) {
				links.prev = baseLink + (condition.page - 1) + limitLink;
			}
		}

		return {
			links,
			logs: results,
		};
	}
}
