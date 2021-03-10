const express = require('express')
require('./db/mongoose')
const outBoundRoute = require('./routers/bound')


const app = express()

app.use(express.json())
app.use(outBoundRoute)

module.exports= app
