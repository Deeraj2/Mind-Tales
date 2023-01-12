import mongoose from "mongoose";
import Blog from "../models/BlogModal.js";

export const getBlogs = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Blog.countDocuments({});
    const blog = await Blog.find()
      .populate("postedBy", "-password")
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: blog,
      currentPages: Number(page),
      numberOfPage: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserBlog = async (req, res) => {
  try {
    const blog = await Blog.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUserSavedBlog = async (req, res) => {
  try {
    const blog = await Blog.find({
      savePost: { $all: [req.user._id] },
    }).populate("postedBy", "-password");
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json(error);
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
    const blog = await Blog.findById(id)
      .populate("comments.replies.commentedBy", "-password")
      .populate("postedBy", "-password")
      .populate("comments.commentedBy", "-password");
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const like = async (req, res) => {
  const { blogId } = req.body;

  try {
    const like = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("comments.commentedBy", "-password")
      .populate("postedBy", "-password");
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
    )
      .populate("comments.commentedBy", "-password")
      .populate("postedBy", "-password");
    res.status(200).json(unlike);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const save = async (req, res) => {
  const { blogId } = req.body;

  try {
    const like = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { savePost: req.user._id },
      },
      {
        new: true,
      }
    )
      .populate("comments.commentedBy", "-password")
      .populate("postedBy", "-password");
    res.status(200).json(like);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const unsave = async (req, res) => {
  const { blogId } = req.body;
  try {
    const unlike = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { savePost: req.user._id },
      },
      { new: true }
    )
      .populate("comments.commentedBy", "-password")
      .populate("postedBy", "-password");
    res.status(200).json(unlike);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const comment = async (req, res) => {
  const { text, blogId } = req.body;

  try {
    const comment = {
      text: text,
      commentedBy: req.user._id,
    };

    const commented = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { comments: comment },
      },
      { new: true }
    )
      .populate("comments.replies.commentedBy", "-password")
      .populate("comments.commentedBy", "-password")
      .populate("postedBy", "-password");
    res.status(200).json(commented);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.body;

  try {
    const deleteComment = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    )
      .populate("comments.replies.commentedBy", "-password")
      .populate("comments.commentedBy", "-password")
      .populate("postedBy", "-password");
    res.status(200).json(deleteComment);
  } catch (error) {
    console.log(error);
  }
};

export const replyComment = async (req, res) => {
  const { reply, blogId, commentId } = req.body;

  try {
    const comment = {
      text: reply,
      commentedBy: req.user._id,
    };

    const replied = await Blog.findOneAndUpdate(
      {
        blogId,
        "comments._id": commentId,
      },
      {
        $push: { "comments.$.replies": comment },
      },
      { new: true }
    )
      .populate("comments.replies.commentedBy", "-password")
      .populate("comments.commentedBy", "-password")
      .populate("postedBy", "-password");
    res.status(200).json(replied);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteReplyComment = async (req, res) => {
  const { blogId, commentId } = req.body;

  try {
    const deleteComment = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { "comments.$[].replies": { _id: commentId } } },
      { new: true }
    )
      .populate("comments.replies.commentedBy", "-password")
      .populate("comments.commentedBy", "-password")
      .populate("postedBy", "-password");
    res.status(200).json(deleteComment);
  } catch (error) {
    console.log(error);
  }
};

export const unpublishBlog = async (req, res) => {
  const { id } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    await Blog.updateOne(
      { _id: id },
      {
        $set: {
          isPublished: false,
        },
      }
    );
    res.status(200).json({ message: "Unpublished" });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const publishingBlog = async (req, res) => {
  const { id } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);
    await Blog.updateOne(
      { _id: id },
      {
        $set: {
          isPublished: true,
        },
      }
    );
    res.status(200).json("Published");
  } catch (error) {
    res.status(404).json(error);
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const blog = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with this ${id}`);
  // const updateblog = { title, story, _id: id };

  await Blog.findByIdAndUpdate(id, { ...blog, _id: id }, { new: true });

  res.json("Updated");
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post available in this id");

  await Blog.findByIdAndRemove(id);
  res.json("Delete successfully");
};
