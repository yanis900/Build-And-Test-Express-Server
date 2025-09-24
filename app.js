const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const gigs = [{
    name: '',
    image: '',
    date: '',
    location: '',
    id: '',
}]

module.exports = app

