import express from "express";
import auth from "../middleware/auth.js";
import { likePost } from "../controllers/like.js";

const route = express.Router();

route.post("/", auth, likePost);

export default route;
