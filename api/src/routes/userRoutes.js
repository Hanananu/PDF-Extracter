import { Router } from "express";
import userController from "../controllers/userController.js";
import { authenticateJWT } from "../middlewares/jwtMiddleware.js";

const router = Router();

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/profile",authenticateJWT,userController.profile)
router.get("/logout", authenticateJWT, userController.logout);

export default router;
