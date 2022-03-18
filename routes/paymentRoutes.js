const express = require('express')
const router = express.Router()
const paymentController  = require('../controllers/paymentcontrollers')



router.post('/payment/initialize', paymentController.createPayment)

router.get('/payment/verify/:payment_ref', paymentController.verifyPayment)

module.exports = router










module.exports = router