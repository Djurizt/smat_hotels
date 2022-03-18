const express = require('express')
const router = express.Router()
const adminController  = require('../controllers/adminControllers.js')



router.post('/admin/create', adminController.createAdmin)



module.exports = router