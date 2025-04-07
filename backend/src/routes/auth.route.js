import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authSignUpValidation } from "../validation/auth.js";
import { validationMiddelWare } from "../middleware/auth.middleware.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", validationMiddelWare(authSignUpValidation), signup);
router.post("/login", login);
router.post("/logout", logout);

// router.put("/update-profile", protectRoute, updateProfile);

// router.get("/check", protectRoute, checkAuth);

export default router;
