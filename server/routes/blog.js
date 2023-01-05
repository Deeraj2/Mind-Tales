import express from "express";
import {
  getBlog,
  getBlogs,
  like,
  publishPost,
  unlike,
} from "../controllers/blog.js";
import auth from "../middleware/auth.js";

const route = express.Router();

route.get("/", getBlogs);
route.post("/publish", auth, publishPost);
route.get("/singleBlog/:id", getBlog);
route.put("/like", auth, like);
route.put("/unlike", auth, unlike);

export default route;
