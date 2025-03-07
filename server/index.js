const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");


const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const sheetsRoutes = require("./routes/sheetsRoutes");

const {protect} = require('./middleware/authMiddleware')

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://sheetsdash.vercel.app"], // Adjust based on frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoutes);
app.use("/api/sheets", sheetsRoutes);




// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
