const mysqlConnection = require ('../config/mysql')



const createAdmin = (data) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql:'INSERT into ADMIN(fullname, othername, email, phone, hashedpassword, gender, admin_id) VALUE(?,?,?,?,?,?,?)',
            values: [data.fullname, data.othername, data.email, data.phone, data.hashedpassword, data.gender,data.admin_id]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}
const checkAdminAlreadyExist = (email) => {
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql:'SELECT * from ADMIN where email=?',
            values: [email]
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
    createAdmin,
    checkAdminAlreadyExist
}