const express = require('express')
const router = express.Router()
const clientsController  = require('../controllers/clientsControllers.js')




router.get('/clients/list-rooms', clientsController.allRooms)
router.get('/clients/rooms/:amount', clientsController.getRoomsByAmount)
router.get('/clients/book-rooms/:room_id', clientsController.bookRoom)
router.post('/create_client', clientsController.createClient)
router.get('/client', clientsController.getClient )
router.get('/verify_otp/:otp/:email', clientsController.verifyOtp)
router.get('/resendOtp/:phone_number', clientsController.resendOtp )





module.exports = router