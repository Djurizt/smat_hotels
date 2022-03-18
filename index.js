require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const displayRoutes = require('express-routemap')
const mySqlConnection = require('./config/mysql')
const clientRoutes = require('./routes/client.routes')
const authRoutes = require('./routes/auth.routes')
const paymentRoutes = require('./routes/payment.routes')



const port = process.env.PORT


app.use(bodyParser.json())
app.use(clientRoutes)
app.use(authRoutes)
app.use(paymentRoutes)

app.listen(port, () => {

    console.log(`i am listening on ${port}`)
    displayRoutes(app)
})

mySqlConnection.connect(err => {
    if (err) throw err.stack
    // connected
    console.log('successfully connected: ' , mySqlConnection.threadId)
    
})





app.get('/', (req, res) => {
    
    res.status(200).send({
        status: true,
        message: "Welcome ",
        data: []
    })

})


app.use((req, res,) => {

        res.status(404).send({
            status: "error",
            message: "Seems you got lost. so sorry"
        })

})