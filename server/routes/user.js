import express from "express";
import { signIn, signUp, userInfo, userProfile } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const route = express.Router();

route.post("/signup", signUp);
route.post("/signin", signIn);

route.get("/userInfo/:id", userInfo);
route.post("/searchUser/:id", userProfile);

export default route;
