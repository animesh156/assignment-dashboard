const express = require('express')
const axios = require('axios')
const router = express.Router()


const API_KEY = process.env.GOOGLE_API_KEY;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = "testing"; // Change range as needed



router.get("/data", async (req,res) => {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data.values);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch Google Sheet data" });
      }
})

module.exports = router