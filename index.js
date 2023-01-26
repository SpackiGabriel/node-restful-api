// Initial imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// Endpoint
app.get('/', (req, res) => {

    res.json({
        message: "Hello World!"
    })

})

// API Controllers
const personController = require('./controllers/personController')
app.use('/person', personController)

// Database config
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.PASSWORD)

// Start application
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.pu6lbln.mongodb.net/data?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Database connected!")
        console.log("Server is now running on http://localhost:3000")
        app.listen(3000)
    })
    .catch((error) => {
        console.log(error)
    })

