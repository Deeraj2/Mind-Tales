import jwt from "jsonwebtoken";
import User from "../models/UserModal.js";

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, "test");

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorised, token failure" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, not token" });
  }
};

export default auth;
