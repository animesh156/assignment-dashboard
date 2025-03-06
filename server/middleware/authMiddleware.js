const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    if (!req.cookies || !req.cookies.jwt) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const token = req.cookies.jwt;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ error: "Not authorized, user not found" });
    }

    next();
  } catch (error) {
    console.log("Auth error:", error);
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};

module.exports = { protect };
