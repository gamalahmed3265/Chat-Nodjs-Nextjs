import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const validationMiddelWare = (validatetor) => (req, res, next) => {
  const { error } = validatetor.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  }

  next();
};

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      decoded,
      user,
    });
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
