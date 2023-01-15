import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blog.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log("Server is working in 7000..");
});
