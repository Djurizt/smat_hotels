
require('dotenv').config()
const Joi = require('Joi')
const clientsModel = require('../models/clientsModels')
const { v4: uuidv4 } = require('uuid')
const emailServices = require('../services/emailServices')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const smsServices = require('../services/smsServices')
const util = require('util')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')




const saltRounds = 10;


const hashMyPassword = (password) =>{
return new Promise((resolve, reject) =>{
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if(err){
            reject(err)
        }
        resolve(hash)
    })
})

}


const generateOTP = ()=>{

    return Math.floor(Math.random() * 1000000)
}

const getClient = (req, res) => {
   
    const  email  = req.body.email
    const phone_number = req.body.phone_number

    clientsModel.getClientDetailsByEmailAndPhone(email, phone_number)
    .then(clientDetails =>{
       // console.log('here', clientDetails)
       if(clientDetails == ''){
           throw new Error('unable to complete action')
       }

        res.status(200).send({
            status: true,
            message: "client detils fetched",
            data: clientDetails.data
        })
        })
    
    .catch (e=> {
        res.status(400).send({
            status: false,
            message: "Error"
        })
    })

}

const createClient = (req, res) => {

 
    const userSchema = Joi.object({
        firstname: Joi.string().required(),
        othernames: Joi.string().required(),
        Address: Joi.string().required(),
        email: Joi.string().email().required(),
        phone_number: Joi.string().required(),
        password: Joi.string().required(),
        gender: Joi.string().required(),
        Next_of_kin:Joi.string().required(),
        Next_of_kin_Address: Joi.string().required(),
      

    })

    const responseFromJoiValidation = userSchema.validate(req.body)
    if (responseFromJoiValidation.error){
       
        res.status(422).send({
            status: false,
            message:  "Bad Request"
        })   
    }
  
 //const {firstname, othernames, email, phone_number, password, gender, Next_of_kin, Next_of_kin_Address} = req. body
    req.body.customer_id = uuidv4()
    const otp = generateOTP()
    clientsModel.checkClient(req.body.email, req.body.phone_number)
    
    .then(checkClientResult => {
        if (checkClientResult != "") {
            throw new Error('client already exist')
        }
    return hashMyPassword(req.body.password)

    })
    .then(responseFromHashPassword=>{
    req.body.password = responseFromHashPassword
 
        return clientsModel.newClient(req.body)
        
    })
    .then(newClientResult=>{
        // console.log('here', newClientResult)
        const userFullname = `${req.body.firstname} ${req.body.othernames}`
        const dataReplacement = {
            "fullname": userFullname,
            "otp": otp
        }
       clientsModel.insertOtp(otp, req.body.customer_id)
       emailServices.readFileAndSendEmail (req.body.email, "OTP VERIFICATION", dataReplacement, 'otp')
       smsServices.sendSMS(req.body.phone_number, `Hello, your otp is ${otp}`)  
      
       res.status(200).send({
            status: true,
            message: "Account successfully created",
            data: newClientResult.data
        })
    })
    .catch(err => {
            res.status(400).send({
                status: false,
                message: err.message
        
            })
        })
}
const verifyOtp = async(req, res)=>{
 const  { otp, email }  = req.params

  
      try{
          

        const [Err, result] =  await doSomeAsyncMagik(clientModels.getOtp(otp)) 
       // console.log('ehre', result)
        if(Err){
            throw new Error('sorry, this is from us')
        }


      if(isEmpty(result)){
                 throw new Error('otp does not match')
             }
            
      const elaspedOtpTime = Date.now() - result[0].created_at
      if((Math.floor(elaspedOtpTime / 60000) > process.env.OTPExpirationTime)){
                     throw new Error('sorry, your otp has expired')
                 }

      const dataToUpdate = {}
       
        const resp =  await emailServices.readFileAndSendEmail(email, "WELCOME ONBOARD", dataToUpdate, 'welcome')
       
          console.log(resp)  
            res.status(200).send({
            status: true,
            message: 'otp verification was successful',
            data: result.data
        })
    
       }   catch(err) {
            res.status(400).send({
            status: false,
            message: err.message,
            data: []
        })
        }
        }
            
            
    //     clientModels.getOtp(otp)
    //    .then(resultFromClientsModels =>{
        
    //     if(resultFromClientsModels != ""){
    //         throw new Error('otp does not match')
    //     }

    //     const elaspedOtpTime = Date.now() - resultFromClientsModels[0]
    //     if((Math.floor(elaspedOtpTime / 30000) > process.env.OTPExpirationTime)){
    //         throw new Error('sorry, your otp has expired')
    //     }
    // })

    //    .then(finalResponse => {
    //    const dataToUpdate = {}

    //    emailServices.readFileAndSendEmail (req.body.email, "WELCOME ONBOARD", dataToUpdate, 'welcome')
    
    //    res.status(200).send({
    //     status: true,
    //     message: 'otp verification was successful',
    //     data: finalResponse
    // })
    // })

    //   .catch(err => {
    //    res.status(400).send({
    //     status: false,
    //     message: err.message,
    //     data: []
    // })
    // })

const updateClient = () => {

        res.status(200).send({
            status: true,
            message: "Account successfully updated",
            data: []
        })
    }
    
    
const resendOtp =   async (req, res) => {
 const { phone_number } = req.params
 const otp = generateOTP()
        
        try {
    
            await smsServices.sendSMS(phone_number, `Hello, your new otp is ${otp}`)
            
            res.status(200).send({
                status: true,
                message: 'otp successfully send',
                data: []
            })
    
        } catch (err) {
            console.log(err)
            res.status(200).send({
                status: true,
                message: err,
                data: []
            })
        }
        }



const allRooms = (req,res) =>{
        //1. Query DB
        // console.log('i entered here')
        clientsModel.allRooms()
        .then (roomsResult => {
             console.log('i entered here', roomsResult )
            res.status(200).send(
                {
                    status: true,
                    message: "All rooms fetched",
                    data:roomsResult
                })
            })
            // console.log('i entered here secondly')                   
        .catch(error =>{
            res.status(400).send({
                status: false,
                message: error.message,
                response: []
                })       
            })     
}
const getRoomsByAmount = (req,res) =>{
//    let amount = null
    //1. Query DB
    // console.log('i entered here')
    clientsModel.getRoomsByAmount(req.params.amount)
    .then (roomsResult => {
         console.log('i entered here', roomsResult )
       
        if(roomsResult=="" ){
            throw new Error("No available rooms for that amount")
        }
        res.status(200).send(
            {
                status: true,
                message: "Rooms successfully fetched ",
                data:roomsResult
            })
        })
        // console.log('i entered here secondly')                   
    .catch(error =>{
        res.status(400).send({
            status: false,
            message: error.message,
            
            })       
        })     
}
const bookRoom = (req,res) =>{

    clientsModel.checkIfRoomIsAvailable()
    .then (result => {
         console.log('i need you:', result )
       res.status(200).send({
                status: true,
                message: "All rooms fetched",
                data:result

       })
       .catch(error =>{
        res.status(400).send({
            status: false,
            message: error.message,
            
            })       
        }) 

    
 
    // .then (bookingResult =>{

    // })
    //     res.status(200).send(
    //         {
    //             status: true,
    //             message: "All rooms fetched",
    //             data:roomsResult
    //         })
    //     })


})
}

module.exports= {
    allRooms,
    getRoomsByAmount,
    bookRoom,
    createClient,
    getClient,
    verifyOtp,
    updateClient,
    resendOtp
}