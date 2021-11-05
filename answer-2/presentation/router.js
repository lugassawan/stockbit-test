const express = require("express");

const homeController = require("./controllers/home.controller");
const movieController = require("./controllers/movie.controller");
const logController = require("./controllers/log.controller");
const searchMovieParamValidator = require("./validators/search-movie-param.validator");
const endpointLogMiddleware = require("./middlewares/endpoint-log.middleware");

const router = express.Router();

router.use(endpointLogMiddleware.write);

router.get("/", homeController.greetHello);
router.get(
	"/search",
	searchMovieParamValidator.validate,
	movieController.search
);
router.get("/detail/:id", movieController.getMovie);
router.get("/logs", logController.getLogs);

module.exports = router;
