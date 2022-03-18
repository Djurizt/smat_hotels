require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
// const emailServices = require('../services/email.services')
const adminModel = require('../models/admin.models')


const createAdmin = (req,res) =>{
//1. validate data
const adminSchema = Joi.object({ 
    fullname: Joi.string().required(),
    othername: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    hashedpassword: Joi.string().required(),
    gender: Joi.string().required()
   
    
    
})
const validateAdmin = adminSchema.validate(req.body)
console.log('i validated:', validateAdmin)
if (validateAdmin.error) {

    res.status(422).send({
        status: false,
        message: "Bad Request"
    })
}else{

//2. create in DB
//3. check if the Admin has been previously created
req.body.admin_id = uuidv4()

// console.log('i entered here')
adminModel.checkAdminAlreadyExist(req.body.email)
.then (resultAdmin => {
    if(resultAdmin !=""){
        throw new Error ("Admin has already been created")
    }
    // console.log('i entered here secondly')
return adminModel.createAdmin(req.body)
})
.then(result =>{
        res.status(200).send(
            {
                status: "True",
                message: "Admin successfully created",
                data:result.data
            })
        })
.catch(error =>{
    res.status(400).send({
        status: false,
        message: error.message,
        response: []
        })       
    })
}
}




module.exports = {
    createAdmin
}