const express = require('express')
require('./db/mongoose')
const bound = require('./routers/bound')


const app = express()

app.use(express.json())
app.use(bound)

module.exports= app
