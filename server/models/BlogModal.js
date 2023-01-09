import mongoose from "mongoose";

const blogModal = mongoose.Schema({
  title: { type: String },
  story: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  savePost: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      text: String,
      commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      replies: [
        {
          text: String,
          commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
      ],
    },
  ],
  isPublished: { type: Boolean, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Blog = mongoose.model("Blog", blogModal);
export default Blog;
