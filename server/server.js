import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/MindTaleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(7000, () => {
  console.log("Server is working in 7000..");
});
