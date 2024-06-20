import express from "express";
import { deleteBlog, getAllBlogs, getSelfBlogs, getSingleBlog, postBlog, updateBlog } from "../controllers/blogController.js";
import isAuthenticated from "../middlewares/auth.js";
const router = express.Router()

router.route("/createBlog").post(isAuthenticated, postBlog)
router.route("/updateBlog/:id").put(isAuthenticated, updateBlog)
router.route("/deleteBlog/:id").delete(isAuthenticated, deleteBlog)
router.route("/getAllBlogs").get(getAllBlogs)
router.route("/getSelfBlogs").get(isAuthenticated, getSelfBlogs)
router.route("/getSingleBlog/:id").get(getSingleBlog)

export default router;