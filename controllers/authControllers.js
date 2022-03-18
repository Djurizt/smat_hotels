require('dotenv').config()
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')
const util = require('util')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
const bcrypt = require('bcrypt')
const clientModels = require('../models/clientsModels')
const emailServices = require('../services/emailServices')









const Login = (req, res) =>{
    const {email, password} = req.body


   getClientDetailsByEmailAndPhone(email)
    .then(resultFromLogin =>{
       if(resultFromLogin == ""){
           throw new Error('invalid credentials')
       }
    
       payload = resultFromLogin[0]

       return bcrypt.compare(password, resultFromLogin[0].password)
    })
    

.then(resultFromPasswordCompare => {
    if (resultFromPasswordCompare == false) {
        throw new Error("Invalid Email or Password")
    }

    const dataToAddInMyPayload = {
        email: payload.email,
        }

        jwt.sign(dataToAddInMyPayload, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES_TIME },
            (err, token) => {
                if (err) {
                    throw new Error("Something don sele")
                }
            
                res.setHeader('token', token).status(200).send({
                            status: true,
                            message: "Successfully logged in "
               })
               
            })
        })

 .catch(err => {

         res.status(400).send({
         status: false,
         message: err.message 
         })
         })
        }

        const startForgetPassword = async (req, res) => {

            const { email } = req.params
            const customer_id = uuidv4()
            try {
                
                let [err, checkIfEmailExist] = await doSomeAsyncMagik(clientModels.getClientDetailsByEmailAndPhone(email, customer_id))
                 
                if (err) {
                  
                    throw new Error('This is on us, something went wrong', 400)
                }
                if (!isEmpty(checkIfEmailExist)) {
                    console.log('eror', checkIfEmailExist)
                    throw new Error(`If the email ${email} account exist with us, you will get a reset password email`)
                }
                let hash = uuidv4().replace(/-/gi, '')
                let [err2, createForgetPasword] = await doSomeAsyncMagik(clientModels.forgetPasswordModel(email,hash))
               
                if (err2) {
                    throw new Error('Please try This is on us, something went wrong')
                }
                if (!isEmpty(createForgetPasword)) {
                    console.log('yoooo', createForgetPasword)
                    let dataReplacement = {
                        // "fullname": `${req.body.firstname} , ${req.body.othernames} `,
                        "fullname": req.body.fullname,
                        "resetPasswordlink": `${process.env.RESET_PASSWORD_LINK}/${hash}`
                    }
                      
                       emailServices.readFileAndSendEmail(email, "RESET PASSWORD", dataReplacement, "forgetPassword")
                }
               
        
                res.status(200).send({
                    status: true,
                    message: `If the email ${email} account exist with us, you will get a reset password email`
                })
        
        
            } catch (e) {
                console.log(e)
                res.status(400).send({
                    status: true,
                    message: e.message 
                })
        
            }
        
        
        }
        
        const completeForgetPassword = async (req, res) => {
        
            const {hash} = req.params
            const { newPassword, confirmNewPassword } = req.body
            try {
                const [err, checkIfHashIsValid] = await doSomeAsyncMagik(clientModels.validateHash(hash))
                if (err) {
                    throw new Error('Internal Server Error', 500)
                }
                if (isEmpty(checkIfHashIsValid)) {
        
                    throw new Error('Unable to perform this operation', 400)
                }
                if (newPassword != confirmNewPassword) {
                    throw new Error('Password does not match', 400)
                }
             
        
                //update the password
                // const passwordHashed = hashMyPassword(newPassword)
                // let [err2, updatePasswordResponse] = await doSomeAsyncMagik(clientModels.updatePassword(passwordHashed[1], checkIfHashIsValid[0].email))
                // if (err2) {
                //     throw new Error('Internal Server Error', 500)
                // }
              
             
        
                // await deleteResetPasswordRecord(hash)
        
                res.status(200).send({
                    status: true,
                    message: `Password successfully updated`
                })
            }
        catch (e) {
            console.log(e)
                res.status(400).send({
                    status: false,
                    message: e.message 
                })
        }
        
        
        }
        
    
module.exports = {
    Login,
    startForgetPassword,
    completeForgetPassword
}