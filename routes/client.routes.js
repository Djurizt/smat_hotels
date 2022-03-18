const express = require('express')
const router = express.Router()
const clientsController  = require('../controllers/clients.controllers.js')




router.get('/clients/list-rooms', clientsController.allRooms)
router.get('/clients/rooms/:amount', clientsController.getRoomsByAmount)
router.get('/clients/book-rooms/:room_id', clientsController.bookRoom)



module.exports = router