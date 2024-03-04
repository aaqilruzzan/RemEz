const express = require('express')

//controller function
const{loginUser,signupUser} = require('../controllers/pdf/userControllers')

const router = express.Router()

//login route
router.post('/login' , loginUser)

//signup login
router.post('/signup' , signupUser)


module.exports = router