// BlogController.js
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../services/BlogService.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res.json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogByid = async (req, res) => {
  try {
    const blog = await getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addBlogs = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ message: "No File Uploaded" });
  const { title, description } = req.body;
  const file = req.files.image;

  try {
    const blog = await createBlog(
      title,
      description,
      file,
      req.protocol,
      req.get("host")
    );
    res.status(201).json({ message: "Blog Created Successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlogs = async (req, res) => {
  const { title, description } = req.body;
  const file = req.files ? req.files.image : null;

  try {
    await updateBlog(
      req.params.id,
      title,
      description,
      file,
      req.protocol,
      req.get("host")
    );
    res.status(200).json({ message: "Blog Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlogs = async (req, res) => {
  try {
    await deleteBlog(req.params.id);
    res.status(200).json({ message: "Blog Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
