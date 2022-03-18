const mysqlConnection = require ('../config/mysql')



const allRooms = () => {
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql:'SELECT * from ROOMS',
            values: []
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}
const getRoomsByAmount = (amount) => {
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql:'SELECT * from ROOMS where amount=?',
            values: [amount]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const bookRoom = (room_id) =>{
    return new Promise((resolve, reject) => {
        mysqlConnection.query({
            sql:'SELECT * from ROOMS WHERE room_id=? ',
            values: [room_id]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}
const checkIfRoomIsAvailable = () =>{
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql:'SELECT * from ROOMS where isAvailable=1',
            values: []
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}
const updateRoomStatus = (room_id) =>{
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql:'update ROOMS SET isAvailable=0 where room_id=?',
            values: [room_id]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}



module.exports = {
    allRooms,
    getRoomsByAmount,
    bookRoom,
    checkIfRoomIsAvailable,
    updateRoomStatus
}