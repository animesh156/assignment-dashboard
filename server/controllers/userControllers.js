const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Gnerate JWT
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30m", // Token expires in 30 minutes
  });

  // Store token in HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "Strict",
    maxAge: 30 * 60 * 1000, // 30 minutes in milliseconds
  });
};

// @desc Register a new user
// @route POST /api/register
// @access Public

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user has given all the required fields
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all the required fields" });
  }

  // checks if user exists or not
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ error: "User already exist" });
  }

  // hash the given password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json("Invalid user data");
  }
};


// @desc Login the exisiting user
// @route POST /api/login
// @access Public

const loginUser = async (req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))) {
        generateToken(res,user._id)
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,  
        })
    }
    else {
        return res.status(400).json({error: "Invalid credentials"}) 
    }
}


// @desc logout the user
// @route POST /api/logout
// access private(only loggedin user)

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "Strict",
      expires: new Date(0), // Expire immediately
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Logout failed. Try again." });
  }
};



const checkSession = async (req,res) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.status(401).json({ message: "Session expired" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET); // Verify token
    return res.status(200).json({ message: "Session valid" });
  } catch (error) {
    return res.status(401).json({ message: "Session expired" });
  }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    checkSession
}