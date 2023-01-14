import bcrypt from "bcryptjs";
import User from "../models/UserModal.js";
import generateToken from "../config/generateToken.js";

export const signUp = async (req, res) => {
  const { name, email, password, pic } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please enter the field" });
    }

    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      name,
      email,
      pic,
      password: hashedPassword,
    });

    res.status(201).json({
      result,
      token: generateToken(result._id),
    });
  } catch (error) {
    res.status(401).json({ message: "Error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (!exist) return res.status(400).json({ message: "User exists" });

    const isPassword = await bcrypt.compare(password, exist.password);

    if (!isPassword)
      return res.status(404).json({ message: "Pssword is incorrect" });

    if (exist && isPassword)
      return res
        .status(200)
        .json({ result: exist, token: generateToken(exist._id) });
  } catch (error) {
    res.status(401).json({ message: "Invalid email and token" });
  }
};

export const userInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const userProfile = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          {
            name: { $regex: req.query.search, $options: "i" },
          },
          {
            email: { $regex: req.query.search, $options: "i" },
          },
        ],
      }
    : {};

  let profile = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select("-password");
  profile = profile.slice(0, 5);
  res.status(200).json(profile);
};
