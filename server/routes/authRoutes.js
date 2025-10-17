import Router from "express"
import { forgetPassword, login, logout, register, resetPassword } from "../controllers/authController.js";

const router = Router();

router.post("/register", register)
router.post("/login", login)
router.post("/forgetPassword", forgetPassword)
router.post("/resetPassword", resetPassword)
router.post("/logout", logout)

export default router;