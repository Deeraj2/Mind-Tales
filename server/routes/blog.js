import express from "express";
import {
  comment,
  deleteBlog,
  deleteComment,
  deleteReplyComment,
  getBlog,
  getBlogs,
  getUserBlog,
  getUserSavedBlog,
  like,
  publishPost,
  publishingBlog,
  replyComment,
  save,
  unlike,
  unpublishBlog,
  unsave,
  updateBlog,
} from "../controllers/blog.js";
import auth from "../middleware/auth.js";

const route = express.Router();

route.get("/", getBlogs);
route.get("/userBlog", auth, getUserBlog);
route.get("/savedUserBlog", auth, getUserSavedBlog);

route.post("/publish", auth, publishPost);
route.get("/singleBlog/:id", getBlog);

route.put("/like", auth, like);
route.put("/unlike", auth, unlike);

route.put("/save", auth, save);
route.put("/unsave", auth, unsave);

route.put("/comment", auth, comment);
route.put("/deleteComment", auth, deleteComment);

route.put("/reply", auth, replyComment);
route.put("/deletereply", auth, deleteReplyComment);

route.put("/unpublish", auth, unpublishBlog);
route.put("/publishing", auth, publishingBlog);

route.put("/update/:id", auth, updateBlog);
route.delete("/delete/:id", auth, deleteBlog);

export default route;
