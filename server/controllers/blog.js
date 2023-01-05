import mongoose from "mongoose";
import Blog from "../models/BlogModal.js";

export const getBlogs = async (req, res) => {
  try {
    const blog = await Blog.find().populate("postedBy", "-password");
    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }
};

export const publishPost = async (req, res) => {
  const { title, story } = req.body;

  try {
    if (!title || !story)
      return res.status(400).json({ message: "Please fill the fields" });
    const blog = new Blog({
      title,
      story,
      isPublished: true,
      postedBy: req.user._id,
    });
    const createBlog = await blog.save();
    res.status(200).json(createBlog);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate("postedBy", "-password");
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const like = async (req, res) => {
  const { blogId } = req.body;

  // let blog = await Blog.findById(blogId);

  // const index = blog.likes.findIndex((id) => id === req.user._id);

  // if (index === -1) {
  //   blog.likes.push(req.user._id);
  // } else {
  //   blog.likes = blog.likes.filter((id) => id !== req.user._id);
  // }

  // const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true });

  // res.status(200).json(updatedBlog);

  try {
    const like = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    ).populate("postedBy", "-password");
    res.status(200).json(like);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const unlike = async (req, res) => {
  const { blogId } = req.body;
  try {
    const unlike = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    ).populate("postedBy", "-password");
    res.status(200).json(unlike);
  } catch (error) {
    res.status(400).json(error);
  }
};
