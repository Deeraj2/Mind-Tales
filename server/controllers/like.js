import Like from "../models/LikeModal.js";

export const likePost = async (req, res) => {
  const { blogId } = req.body;
  console.log(blogId);
  const found = await Like.findOne({ user: req.user._id, blog: blogId });

  if (!found) {
    await Like.create({ blog: blogId, user: req.user._id });
    res.status(200).json({ liked: true });
  } else {
    await Like.deleteOne({ blog: blogId, user: req.user._id });
    res.status(200).json({ liked: false });
  }
};
