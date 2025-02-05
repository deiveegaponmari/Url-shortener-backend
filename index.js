const express=require("express");
const web_server=express();
var cors = require('cors')
require('dotenv').config()
//console.log(process.env)
//middleware to parse json
web_server.use(express.json())
web_server.use(cors({origin:["http://localhost:5173"]}))
const{ UserRouter }=require("./controller/UserController");
const { urlShortController } = require('./controller/urlShortController');
//db connectivity
require("./dbconfig");
//routers injection
web_server.use('/user',UserRouter);
web_server.use("/urlshort",urlShortController)

web_server.listen(4000,()=>{
    console.log("server started successfully")
    console.log(`http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`);
})/* const express = require('express');
const Web_Server=express();
var cors = require('cors');
require('dotenv').config()
require("./dbconfig")
const { UserRouter } = require('./controller/userRouter');
const { urlShortController } = require('./controller/urlShortController');

Web_Server.use(express.json())
Web_Server.use(cors())

//routers injection
Web_Server.use("/user",UserRouter)
Web_Server.use("/urlshort",urlShortController)
Web_Server.listen(4000,"localhost",()=>{
    console.log("server connected successfully")
    console.log("http://localhost:4000")
}) */