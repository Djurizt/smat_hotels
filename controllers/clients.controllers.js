
require('dotenv').config()
const Joi = require('Joi')
// const emailServices = require('../services/email.services')
const clientsModel = require('../models/clients.models')

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
    bookRoom
}