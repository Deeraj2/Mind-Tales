import express from "express";
import { signIn, signUp, userInfo } from "../controllers/user.js";

const route = express.Router();

route.post("/signup", signUp);
route.post("/signin", signIn);

route.get("/userInfo/:id", userInfo);

export default route;
