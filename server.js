const mongoose = require('mongoose')
const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/twoter",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

// for parsing incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// for serving all the normal html
app.use(express.static('public'))

app.listen(PORT, function () {
    console.log(`Serving app on: http://localhost:${PORT}`)
})