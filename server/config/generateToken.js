import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "test", { expiresIn: "30d" });
};

export default generateToken;
