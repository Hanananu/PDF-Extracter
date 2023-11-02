import { Router } from "express";
import userController from "../controllers/userController";
import { authenticateJWT } from "../middlewares/jwtMiddleware";

const router = Router();

router.post("/login", userController.login);
router.get("/signup", userController.signup);
router.post("/logout", authenticateJWT, userController.logout);

export default router;
