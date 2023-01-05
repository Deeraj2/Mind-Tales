import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  commentBody: {
    type: String,
  },
});
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
