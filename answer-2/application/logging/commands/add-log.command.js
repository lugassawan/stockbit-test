export class AddLogCommand {
	constructor(logRepository) {
		this.logRepository = logRepository;
	}

	async execute({ method, pathname, params, query }) {
		await this.logRepository.save({
			method,
			pathname,
			params,
			query,
		});
	}
}
