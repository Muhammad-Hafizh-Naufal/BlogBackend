import express from "express";
import {
  getBlogs,
  getBlogByid,
  addBlogs,
  updateBlogs,
  deleteBlogs,
} from "../controller/BlogController.js";

const router = express.Router();

router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlogByid);
router.post("/blogs", addBlogs);
router.patch("/blogs/:id", updateBlogs);
router.delete("/blogs/:id", deleteBlogs);

export default router;
