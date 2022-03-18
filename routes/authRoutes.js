const express = require('express')
const router = express.Router()
const authController  = require('../controllers/authControllers')



router.post('/login', authController.Login)

router.get('/start-forget-password/:email', authController.startForgetPassword)

router.patch('/complete-forget-password/:hash', authController.completeForgetPassword)






module.exports = router
