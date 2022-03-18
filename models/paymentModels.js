const mysqlConnection = require('../config/mysql')








const createPayment =  (data) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query({
            sql: `INSERT into payment(customer_id,amount,customer_unique_number,payment_ref) VALUES(?,?,?,?)`,
            values: [data.customer_id, data.amount, data.customer_unique_number, data.transaction_reference]
        }
            , (err, results, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
    })
}


// const updatePayment =    (data) => {
//     return new Promise( (resolve, reject) => {
//         mysqlConnection.query({
//             sql: `update payment set payment_flutterwave_flw_ref=Null, payment_flutterwave_tx_ref=Null,transaction_flutterwave_flw_ref=Null, where sn=?`,
//             values: [data.payment_flutterwave_flw_ref, data.payment_flutterwave_tx_ref, data.transaction_flutterwave_flw_ref, data.sn]
//         }
//          ,  (err, results, fields) => {
//              if (err) {
//                reject(err);
//              }
//              resolve(results);
//          })
//       })
 

// }




module.exports = {
    createPayment,
    // updatePayment
}