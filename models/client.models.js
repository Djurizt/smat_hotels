
const mysqlConnection = require('../config/mysql')






        


const checkClient = async (email, phone_number) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from client where email=? or phone_number=?`,
            values: [email, phone_number]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

    


const newClient = ( data) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql:'INSERT into client(firstname, othernames, email, phone_number, password, gender, Next_of_kin, Next_of_kin_Address, customer_id) VALUE(?,?,?,?,?,?,?,?,?)',
            values: [data.firstname, data.othernames, data.email, data.phone_number, data.password, data.gender, data.Next_of_kin, data.Next_of_kin_Address, data.customer_id]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}


const getClientDetailsByEmailAndPhone=  async ( email,phone_number) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from client where email=? and phone_number =?`,
            values: [email, phone_number]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}



const getOtp =   (otp) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query(
            {
                sql: `select * from _otps where otp=?`,
                values: [otp]
            },
            (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 
    }

   const insertOtp = async  (otp, customer_id) => {
        return new Promise( (resolve, reject) => {
            mysqlConnection.query(
                {
                     sql: `insert into _otps(otp,customer_id) VALUE(?,?)`,
                    values: [otp, customer_id]
                },
                (err, results, fields) => {
                 if (err) {
                   reject(err);
                 }
                 resolve(results);
             })
          })
     
        }
        const forgetPasswordModel = async(email, hash) => {
            return new Promise( (resolve, reject) => {
                mysqlConnection.query(
                    {
                        sql: `Insert into _forget_password(email,hash)values(?,?)`,
                        values: [email,hash]
                    },
                    (err, results, fields) => {
                     if (err) {
                       reject(err);
                     }
                     resolve(results);
                 })
              })
         
         
         
         
        }
        
        const validateHash = async (hash) => {
           
            return new Promise((resolve, reject) => {
        
                mysqlConnection.query({
                    sql: `select * from _forget_password where hash=?`,
                    values: [hash]
                },
                  (err, results, fields) => {
                        if (err) {
                         reject(err)
                        }
                        resolve(results)
                  })
            })
        }
        
        const updatePassword = async (password, email) => {
        
           
            return new Promise((resolve, reject) => {
        
                mysqlConnection.query({
                    sql: `update client set password=? where email=?`,
                    values: [password, email]
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
    checkClient,
    newClient,
    getClientDetailsByEmailAndPhone,
    getOtp,
    insertOtp,
    forgetPasswordModel,
    validateHash,
    updatePassword
    
    
}