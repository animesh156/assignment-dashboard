const express = require("express");
const { saveColumns, getColumns } = require("../controllers/columnControllers");

const router = express.Router();

router.post("/save", saveColumns);

router.get("/", getColumns);

module.exports = router;
