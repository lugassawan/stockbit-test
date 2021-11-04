import { OmdbService } from "./../../infrastructure/omdb/omdb.service";
import { SearchMovieQuery } from "./../../application/movie/queries/search-movie.query";
import { GetMovieQuery } from "./../../application/movie/queries/get-movie.query";
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
	const { id } = req.params;

	const omdbService = new OmdbService();
	const queryBus = new GetMovieQuery(omdbService);
	const { movie, message } = await queryBus.execute(id);

	if (!!movie) {
		return ResponseHelper.toSuccess(res, movie);
	}

	return ResponseHelper.toFail(res, [{ field: "id", message }], {
		statusCode: 404,
	});
};

export default { search, getMovie };
