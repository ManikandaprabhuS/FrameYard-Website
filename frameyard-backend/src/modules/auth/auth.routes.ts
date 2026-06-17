import { Router } from "express";
import {  login, profile, register, updateUserProfile } from "./auth.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateUser, profile);
router.put("/profile",authenticateUser,updateUserProfile);

export default router;