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

web_server.listen(process .env.HOST_PORT,()=>{
    console.log("server started successfully")
    console.log(`http://${process.env.HOST_NAME}:${process.env.HOST_PORT}`);
})