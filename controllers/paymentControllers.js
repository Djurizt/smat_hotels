require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
//const paymentModel = require('../models/payment.models')
const paymentService = require('../services/paymentServices')



const createPayment =  (req, res) => {
    const {amount, email, paymentOptionType} = req.body
    req.params.payment_ref = uuidv4()
     
    const paymentSchema = Joi.object({
       
        amount:Joi.number().required(),
        email: Joi.string().email().required(),
        paymentOptionType: Joi.string().valid('card','banktransfer','ussd').required()
        
    })

    const responseFromJoiValidation = paymentSchema.validate(req.body)
    if (responseFromJoiValidation.error) {
    
            throw new Error('error')
        }
        
       // console.log("freee: ", )
        paymentService.initializePayment(req.body)
        
        .then(checkPayment2 => {
            
          //  console.log("fresh: ", checkPayment2)
            if(checkPayment2.length == 0){
                throw new Error('payment cannot be initialize')
            }
            
            res.status(200).send({
                status: true,
                message: "payment successfully initiated",
                data: checkPayment2.data.data

            })
        //return paymentModel.createPayment(req.body)

        })
        .catch(e => {
            console.log("ee: ", e)
             res.status(400).send({
                 status: false,
                 message:   e.message 
     
          })
         })

        }
     
const verifyPayment = (req, res) =>{
    const { payment_ref } = req.params

    paymentService.verifyPayment(payment_ref)
    
        .then(result => {
            if (result.length = 0) {
                
                throw new Error("payment cannot be verified ")
            }
        res.status(200).send({
                     status: true,
                     message: "payment successfully found",
                     data: result.data.data
        })
    })
    
  //  return paymentModel.updatePayment(req.body)


        .catch(error => {
        res.status(400).send({
                     status: true,
                     message: error.response.message
                 })
    })
}





module.exports = {
    createPayment,
    verifyPayment
}