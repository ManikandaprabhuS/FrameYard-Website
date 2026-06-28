import { Router } from "express";
import {  adminLogin, login, profile, register, updateUserProfile } from "./auth.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try again later."
  }
});

const router = Router();

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.post("/admin/login", loginLimiter,adminLogin);
router.get("/profile", authenticateUser, profile);
router.put("/profile",authenticateUser,updateUserProfile);

export default router;