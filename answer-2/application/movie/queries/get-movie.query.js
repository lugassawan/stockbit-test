module.exports = class GetMovieQuery {
	constructor(omdbService) {
		this.omdbService = omdbService;
	}

	async execute(id) {
		const movie = await this.omdbService.findById(id);

		let message = null;
		if (!movie) {
			message = `Data is not found for ID ${id}`;
		}

		return { movie, message };
	}
};
