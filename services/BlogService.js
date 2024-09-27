// BlogService.js
import { Blogs } from "../models/BlogModels.js";
import fs from "fs";
import path from "path";

export const getAllBlogs = async () => {
  return await Blogs.findAll();
};

export const getBlogById = async (id) => {
  return await Blogs.findOne({
    where: { id },
  });
};

export const createBlog = async (title, description, file, protocol, host) => {
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${protocol}://${host}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) {
    throw new Error("Invalid Image");
  }
  if (fileSize > 5000000) {
    throw new Error("Image must be less than 5 MB");
  }

  file.mv(`./public/images/${fileName}`);

  return await Blogs.create({ title, description, image: fileName, url });
};

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
