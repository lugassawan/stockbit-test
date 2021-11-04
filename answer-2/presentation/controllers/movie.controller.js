import axios from "axios";
import CustomError from "./../../helper/custom-error.helper";
import { OmdbService } from "./../../infrastructure/omdb/omdb.service";
import { SearchMovieQuery } from "./../../application/movie/queries/search-movie.query";
import { ResponseHelper } from "./../../helper/response.helper";

export const search = async (req, res) => {
	const query = req.query.q;
	const page = Number(req.query.page) || 1;

	const omdbService = new OmdbService();
	const queryBus = new SearchMovieQuery(omdbService);
	const { movies, links } = await queryBus.execute(query, page);

	let statusCode = movies.length > 0 ? 200 : 404;
	return ResponseHelper.toSuccess(
		res,
		{
			links,
			movies,
		},
		{ statusCode }
	);
};

export const getMovie = async (req, res) => {
	try {
		const { id } = req.params;

		const omdbRes = await axios.get("https://www.omdbapi.com", {
			params: {
				apikey: "faf7e5bb",
				i: id,
			},
		});

		const data = {};
		if (omdbRes.data.Response.toLowerCase() !== "true") {
			throw CustomError(`Data is not found for ID ${id}`, {
				statusCode: 404,
				fieldName: "id",
			});
		}

		delete omdbRes.data.Response;
		Object.keys(omdbRes.data).forEach((key) => {
			const fieldName = key.toLowerCase();
			const value = omdbRes.data[key];

			if (fieldName === "imdbid") {
				data["id"] = value;
			} else {
				data[fieldName] = value;
			}
		});

		return res.status(200).json({
			data,
			errors: null,
		});
	} catch (error) {
		const statusCode = error.statusCode || 400;
		return res.status(statusCode).json({
			data: null,
			errors: [{ field: error.fieldName, message: error.message }],
		});
	}
};

export default { search, getMovie };
