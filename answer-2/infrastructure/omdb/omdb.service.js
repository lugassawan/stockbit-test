import axios from "axios";

export class OmdbService {
	async findAll(query, page) {
		const dto = { results: [], totalMovie: 0 };

		try {
			const res = await this.__fetch({ s: query, page });

			if (res.data.Search.length > 0) {
				res.data.Search.forEach((movie) => {
					dto.results.push({
						id: movie.imdbID,
						title: movie.Title,
						year: movie.Year,
						type: movie.Type,
						poster: movie.Poster,
					});
				});

				dto.totalMovie = Number(res.data.totalResults) || 0;
			}

			return dto;
		} catch (error) {
			return dto;
		}
	}

	async findById(id) {
		let dto = null;

		try {
			const res = await this.__fetch({ i: id });

			if (res.data.Response.toLowerCase() === "true") {
				delete res.data.Response;
				dto = {};

				Object.keys(res.data).forEach((key) => {
					const fieldName = key.toLowerCase();
					const value = res.data[key];

					if (fieldName === "imdbid") {
						dto["id"] = value;
					} else {
						dto[fieldName] = value;
					}
				});
			}

			return dto;
		} catch (error) {
			return dto;
		}
	}

	__fetch(params) {
		return axios.get("https://www.omdbapi.com", {
			params: {
				apikey: "faf7e5bb",
				...params,
			},
		});
	}
}
