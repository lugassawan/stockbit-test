export class SearchMovieQuery {
	constructor(omdbService) {
		this.omdbService = omdbService;
	}

	async execute(query, page) {
		const { results, totalMovie } = await this.omdbService.findAll(query, page);

		const links = {
			first: null,
			last: null,
			next: null,
			prev: null,
		};

		if (totalMovie > 0) {
			const totalPage = Math.ceil(totalMovie / 10);
			const baseLink = `/search?q=${query}&page=`;

			links.first = baseLink + "1";
			links.last = baseLink + totalPage;

			if (page < totalPage) {
				links.next = baseLink + (page + 1);
			}

			if (page > 1) {
				links.prev = baseLink + (page - 1);
			}
		}

		return {
			links,
			movies: results,
		};
	}
}
