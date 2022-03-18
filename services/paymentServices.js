require('dotenv').config()
const axios = require('axios').default
const { v4: uuidv4 } = require('uuid')
const fetch = require('node-fetch')


// const initalizePayment = (data) => {

//     console.log("paystack call: ", data)
//     return fetch(`${process.env.PAYSTACK_BASE_URL}/payment/initialize`,
//         {
//                     method: "post",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
//                     },
//                     body: JSON.stringify({
//                         "email": data.email,
//                         "amount": parseInt(data.amount) * 100,
//                         "currency": "NGN",
//                         "ref": uuidv4()
                    
//                     })
//                 })


// //             
const initalizePayment = (dataBody) => {

    return axios({
                    method: "post",
                    url: `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                    },
                    data: {
                        "email": dataBody.email,
                        "amount": parseInt(dataBody.amount),
                        "currency": "NGN",
                        "ref": uuidv4()
                    }
                })
}


const verifyPayment = (payment_ref) => {

    return axios({
            method: "get",
            url: `${process.env.PAYSTACK_BASE_URL}/transaction/verify/${payment_ref}`,
            headers: {
                
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            },
    })
        
    }

module.exports = {
    initalizePayment,
    verifyPayment
    
}