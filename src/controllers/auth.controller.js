import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createTokenAcces } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  //desustructurar el body que se envia
  const { email, password, username } = req.body;

  try {

    const userFound = await User.findOne({ email })
    if (userFound) return res.status(400).json("The email is already in use");

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createTokenAcces({ id: userSaved._id });
    res.cookie("token", token);
    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      password: passwordHash,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: "Unauthorized" })

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unautorized" })

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json({ message: "Unauthorized" })

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email
    })
  })
}

export const login = async (req, res) => {
  //desustructurar el body que se envia
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not Found" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Error in credentials" });

    const newUser = new User({
      email,
      password,
    });

    const token = await createTokenAcces({ id: userFound._id });
    res.cookie("token", token);
    res.status(201).json({
      id: userFound._id,
      email: userFound.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {

  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  res.status(201).json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
  });
};

