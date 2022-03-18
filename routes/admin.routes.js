const express = require('express')
const router = express.Router()
const adminController  = require('../controllers/admin.controllers.js')



router.post('/admin/create', adminController.createAdmin)



module.exports = router