require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const displayRoutes = require('express-routemap')
const mySqlConnection = require('./config/mysql')
const adminRoutes = require('./routes/adminRoutes')
const clientsRoutes = require('./routes/clientsRoutes')
const authRoutes = require('./routes/authRoutes')
const paymentRoutes = require('./routes/paymentRoutes')


const port = process.env.PORT

// parse application/json



app.listen(port, () => {
    console.log(`i am listening on ${port}`)
    displayRoutes(app)
})

app.use(bodyParser.json())
app.use(adminRoutes)
app.use(clientsRoutes)
app.use(authRoutes)
app.use(paymentRoutes)

mySqlConnection.connect(err => {
    if (err) throw err.stack
    // connected!
    console.log('successfully connected: ' , mySqlConnection.threadId)
  })






app.get('/', (req, res) => {
    
    res.status(200).send({
        status: "error",
        message: "Welcome guys",
        data: []
    })

})

/*
    Error 404
*/
app.use((req, res, next) => {

        res.status(404).send({
            status: "error",
            message: "This not a valid endpoint"
        })

})