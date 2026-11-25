import express from "express";
import {
  loginValidation,
  registerValidation,
} from "../../validations/authValidation.js";
import {
  authUserController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from "../../controllers/auth/authController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import guestMiddleware from "../../middlewares/guestMiddleware.js";

const authRouter = express.Router();

authRouter.route("/login")
  .post(guestMiddleware, loginValidation, loginController);

authRouter.route("/register")
  .post(guestMiddleware, registerValidation, registerController);

authRouter.route("/logout")
  .post(authMiddleware, logoutController);

authRouter.route("/refreshtoken")
  .post(refreshTokenController);

authRouter.route("/me")
  .get(authMiddleware, authUserController);

export default authRouter;
//