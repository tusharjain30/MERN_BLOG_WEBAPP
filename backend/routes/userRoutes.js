import express from "express";
import { getAllAuthors, getUserDetails, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(isAuthenticated, logout)
router.route("/getAllAuthors").get(getAllAuthors)
router.route("/getUserDetails").get(isAuthenticated ,getUserDetails)

export default router;