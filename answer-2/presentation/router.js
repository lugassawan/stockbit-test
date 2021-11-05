import { Router } from "express";
import homeController from "./controllers/home.controller";
import movieController from "./controllers/movie.controller";
import searchMovieParamValidator from "./validators/search-movie-param.validator";
import logController from "./controllers/log.controller";

const router = Router();

router.get("/", homeController.greetHello);
router.get(
	"/search",
	searchMovieParamValidator.validate,
	movieController.search
);
router.get("/detail/:id", movieController.getMovie);
router.get("/logs", logController.getLogs);

export default router;
