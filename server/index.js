const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
var cors = require("cors");
const connectDB = require("./config/db");

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json("hello");
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
