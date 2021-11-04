import { Router } from "express";
import homeController from "./controllers/home.controller";
import movieController from "./controllers/movie.controller";

const router = Router();

/**
 * API
 * - /logs
 */

router.get("/", homeController.greetHello);
router.get("/search", movieController.search);
router.get("/detail/:id", movieController.getMovie);

export default router;
