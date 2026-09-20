const {Router} = require("express")
const rateLimit = require("express-rate-limit")
const { body } = require("express-validator")
const authRouter = Router()
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middlewares/auth.middleware")

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
})

authRouter.post("/register", authLimiter, [
    body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], authController.registerUserController)

authRouter.post("/login", authLimiter, [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
], authController.loginUserController)

authRouter.get("/logout", authController.logoutUserController)
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)
module.exports = authRouter
