const express = require('express')
const {SheetData} = require('../controllers/sheetsController')
const router = express.Router()

router.get("/data", SheetData)

module.exports = router