const express = require("express");
const { DBConnection } = require("./config/database");
const {json,urlencoded}=express;
const {userRoute}=require("./users/user.routes");
const {PostRoute}=require("./post/post.route");
const app=express();
require('dotenv').config()
/**
 * this is used to give the database status where database is connected or not
 */

DBConnection().then(()=>{
    console.log("db connected successfully");
}).catch((err)=>{
    console.log("db not connected",err);
})

app.use(json());
app.use(urlencoded({extended:true}));
app.use('/user',userRoute);
app.use('/post',PostRoute)
console.log(process.env.DB_HOST);
module.exports={
    app
}