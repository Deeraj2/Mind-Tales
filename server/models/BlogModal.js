import mongoose from "mongoose";

const blogModal = mongoose.Schema({
  title: { type: String },
  story: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  isPublished: { type: Boolean, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Blog = mongoose.model("Blog", blogModal);
export default Blog;
