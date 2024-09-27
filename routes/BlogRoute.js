import express from "express";
import {
  getBlogs,
  getBlogByid,
  addBlogs,
  updateBlogs,
  deleteBlogs,
} from "../controller/BlogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogByid);
router.post("/", addBlogs);
router.patch("/:id", updateBlogs);
router.delete("/:id", deleteBlogs);

export default router;
