const express = require('express')
const router = express.Router()
const clientController = require('../controllers/client.controllers')





router.post('/create_client', clientController.createClient)
router.get('/client', clientController.getClient )
router.get('/verify_otp/:otp/:email', clientController.verifyOtp)
router.get('/resendOtp/:phone_number', clientController.resendOtp )






module.exports = router