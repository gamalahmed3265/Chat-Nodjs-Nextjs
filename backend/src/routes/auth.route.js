import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import {
  authSignInValidation,
  authSignUpValidation,
} from "../validation/auth.js";
import { validationMiddelWare } from "../middleware/auth.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { upload } from "../lib/multer.js";

const router = express.Router();

router.post("/signup", validationMiddelWare(authSignUpValidation), signup);
router.post("/login", validationMiddelWare(authSignInValidation), login);
router.post("/logout", logout);

router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
);

router.get("/check", protectRoute, checkAuth);

export default router;
