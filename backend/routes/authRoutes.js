import express from "express";
import * as auth from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, auth.getMe);
router.post("/register", auth.register);
router.post("/send-email-otp", auth.sendEmailOtpOnly);      
router.post("/verify-email", auth.verifyEmailOtp);         
router.post("/login", auth.login);
router.post("/send-login-otp", auth.sendLoginOtp);
router.post("/verify-login-otp", auth.verifyLoginOtp);
router.post("/forgot-password", auth.forgotPassword);
router.post("/reset-password", auth.resetPassword);
router.post("/refresh-token", auth.refreshToken);

export default router;