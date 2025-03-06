const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
var cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");


connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
