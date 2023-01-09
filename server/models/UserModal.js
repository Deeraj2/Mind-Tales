import mongoose from "mongoose";

const userModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
    },
    // savedBlog: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userModal);

export default User;
