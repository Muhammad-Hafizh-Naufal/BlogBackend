// BlogService.js
import { Blogs } from "../models/BlogModels.js";
import fs from "fs";
import path from "path";

// Get all blogs
export const getAllBlogs = async () => {
  return await Blogs.findAll();
};

// Get blog by ID
export const getBlogById = async (id) => {
  return await Blogs.findOne({
    where: { id },
  });
};

// Add a new blog
export const createBlog = async (title, description, file, protocol, host) => {
  console.log("Creating blog with title:", title);
  console.log("File details:", file);

  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${protocol}://${host}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  console.log("File size:", fileSize);
  console.log("File extension:", ext);
  console.log("Generated file name:", fileName);
  console.log("Generated URL:", url);

  if (!allowedType.includes(ext.toLowerCase())) {
    console.log("Invalid file type");
    throw new Error("Invalid Image");
  }
  if (fileSize > 5000000) {
    console.log("File size too large");
    throw new Error("Image must be less than 5 MB");
  }

  console.log("Moving file to:", `./public/images/${fileName}`);
  try {
    await file.mv(`./public/images/${fileName}`);
  } catch (error) {
    console.error("Error moving file:", error);
    throw error;
  }

  console.log("Creating blog entry in database");
  try {
    const blog = await Blogs.create({
      title,
      description,
      image: fileName,
      url,
    });
    console.log("Blog created successfully:", blog);
    return blog;
  } catch (error) {
    console.error("Error creating blog in database:", error);
    throw error;
  }
};

// Update a blog
export const updateBlog = async (
  id,
  title,
  description,
  file,
  protocol,
  host
) => {
  const blog = await Blogs.findOne({
    where: { id },
  });
  if (!blog) throw new Error("No Data Found");

  let fileName = blog.image;
  if (file) {
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];
    const fileSize = file.data.length;

    if (!allowedType.includes(ext.toLowerCase())) {
      throw new Error("Invalid Image");
    }
    if (fileSize > 5000000) {
      throw new Error("Image must be less than 5 MB");
    }

    const filepath = `./public/images/${blog.image}`;
    fs.unlinkSync(filepath);
    file.mv(`./public/images/${fileName}`);
  }

  const url = `${protocol}://${host}/images/${fileName}`;
  return await Blogs.update(
    { title, description, image: fileName, url },
    {
      where: { id },
    }
  );
};

// Delete a blog
export const deleteBlog = async (id) => {
  const blog = await Blogs.findOne({
    where: { id },
  });
  if (!blog) throw new Error("No Data Found");

  const filepath = `./public/images/${blog.image}`;
  fs.unlinkSync(filepath);

  return await Blogs.destroy({
    where: { id },
  });
};
