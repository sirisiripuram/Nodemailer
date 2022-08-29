const express=require('express')
const bodyParser = require('body-parser')
const app=express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Evalidation = require('./routes/EValidationRoute');
app.use('/',Evalidation)

app.listen(3003)