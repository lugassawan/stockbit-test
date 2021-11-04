import { Router } from "express";
import homeController from "./controllers/home.controller";

const router = Router();

/**
 * API
 * - / : Greeting
 * - /search
 * - /detail/:id
 * - /logs
 */

router.get("/", homeController.greetHello);

export default router;
