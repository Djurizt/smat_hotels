const express = require('express')
const router = express.Router()
const clientsController = require('../controllers/clientsControllers')





router.get('/verify_otp/:otp/:email', clientsController.verifyOtp)
router.get('/resendOtp/:phone_number', clientsController.resendOtp )






module.exports = router