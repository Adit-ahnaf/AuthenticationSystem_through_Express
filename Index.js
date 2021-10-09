const { json } = require('express');
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const testHandler = require("./routeHandler/testHandler")

const app = express();
app.use(cors())
dotenv.config()
app.use(express.json());

mongoose.connect('mongodb://localhost/Portal')

.then(()=>{
    console.log('connection successful')
})
.catch(err=>console.log(err))

app.use('/test', testHandler)



app.listen(5000, ()=>{
   console.log("app listing") 
})