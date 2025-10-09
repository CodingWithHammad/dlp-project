import Router from "express"
import { forgetPassword, login, register, resetPassword } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", protect, register)
router.post("/login", protect, login)
router.post("/forgetPassword", protect, forgetPassword)
router.post("/resetPassword", protect, resetPassword)

export default router;