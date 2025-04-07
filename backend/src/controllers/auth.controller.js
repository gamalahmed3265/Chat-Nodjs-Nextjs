import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    generateToken(newUser._id, res);
    // Return response without password
    res.status(201).json({
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        // Include other non-sensitive fields as needed
      },
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
export const updateProfile = async (req, res) => {};
export const checkAuth = async (req, res) => {};
