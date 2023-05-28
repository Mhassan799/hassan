// console.log("hello world");
const express = require('express');
const app = express();
require('dotenv').config({path: './config.env'})
const connectDB = require('./db/db')
const routerUser = require('./route/userRoute')
const port = process.env.PORT || 5000
// const port = 5000  || process.env.PORT
//connect databse
connectDB()

//mmiddleware
app.use(express.json())
app.use('/api', routerUser)
//routes

//coonect app
app.listen(port, ()=>{
    console.log(`server is runing on port ${port}`)
})