import { Router } from "express";
import homeController from "./controllers/home.controller";
import movieController from "./controllers/movie.controller";
import searchMovieParamValidator from "./validators/search-movie-param.validator";

const router = Router();

/**
 * API
 * - /logs
 */

router.get("/", homeController.greetHello);
router.get(
	"/search",
	searchMovieParamValidator.validate,
	movieController.search
);
router.get("/detail/:id", movieController.getMovie);

export default router;
