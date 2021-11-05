import { Router } from "express";
import homeController from "./controllers/home.controller";
import movieController from "./controllers/movie.controller";
import logController from "./controllers/log.controller";
import searchMovieParamValidator from "./validators/search-movie-param.validator";
import endpointLogMiddleware from "./middlewares/endpoint-log.middleware";

const router = Router();

router.get("/", homeController.greetHello);
router.get(
	"/search",
	searchMovieParamValidator.validate,
	movieController.search
);
router.get("/detail/:id", movieController.getMovie);
router.get("/logs", logController.getLogs);

router.use(endpointLogMiddleware.write);

export default router;
