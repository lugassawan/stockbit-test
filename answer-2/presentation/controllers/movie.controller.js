import axios from "axios";
import CustomError from "./../../helper/custom-error.helper";

export const search = async (req, res) => {
	try {
		if (!req.query.q) {
			throw CustomError("q field is missing from request query", {
				statusCode: 422,
				fieldName: "q",
			});
		}

		if (req.query.q.length < 3) {
			throw CustomError("Minimum length of q string is 3 characters", {
				statusCode: 422,
				fieldName: "q",
			});
		}

		const query = req.query.q;
		const page = Number(req.query.page) || 1;

		const omdbRes = await axios.get("https://www.omdbapi.com", {
			params: {
				apikey: "faf7e5bb",
				s: query,
				page,
			},
		});

		let statusCode = 404;
		let movies = [];
		const links = {
			first: null,
			last: null,
			next: null,
			prev: null,
		};

		if (!!omdbRes.data.Search) {
			if (omdbRes.data.Search.length > 0) {
				statusCode = 200;

				movies = omdbRes.data.Search.map((m) => ({
					id: m.imdbID,
					title: m.Title,
					year: m.Year,
					type: m.Type,
					poster: m.Poster,
				}));

				const totalResult = Number(omdbRes.data.totalResults) || 1;
				const totalPage = Math.ceil(totalResult / 10);
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
		}

		return res.status(statusCode).json({
			data: {
				links,
				movies,
			},
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
