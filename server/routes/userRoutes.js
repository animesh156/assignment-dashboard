const express = require('express')
const router = express.Router()
const {registerUser, loginUser,  checkSession} = require('../controllers/userControllers')
const { protect } = require("../middleware/authMiddleware");



router.post('/register', registerUser)
router.post('/login',loginUser)
router.get('/check',checkSession)


module.exports = router