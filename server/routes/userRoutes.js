const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser} = require('../controllers/userControllers')
const { protect } = require("../middleware/authMiddleware");



router.post('/register', registerUser)
router.post('/login',loginUser)
router.post('/logout',protect, logoutUser)

module.exports = router