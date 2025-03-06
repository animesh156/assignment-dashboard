const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
var cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const sheetsRoutes = require("./routes/sheetsRoutes");
const columnRoutes = require("./routes/columnRoutes");

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
app.use("/api/sheets", sheetsRoutes);
app.use("/api/columns", columnRoutes);

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
