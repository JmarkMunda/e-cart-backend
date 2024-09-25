import express from "express";
import authController from "../controllers/auth";
import authValidator from "../validators/auth";
import validateRequest from "../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/register",
  authValidator.register,
  validateRequest,
  authController.register
);
router.post(
  "/login",
  authValidator.login,
  validateRequest,
  authController.login
);

export default router;
