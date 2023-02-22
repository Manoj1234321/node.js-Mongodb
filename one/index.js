const express = require('express')
var app = express()
var cors = require("cors");
var path = require('path')
app.use(cors());
const cookieParser = require('cookie-parser')
var dir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(dir));
const port = process.env.PORT || 3000
const db = require('./src/database/db')
const route = require('./src/routers/route')
app.use(express.json())
app.use(cookieParser());


app.use('/api/user/v1/',route)

app.get('/',((req,res)=>{
    res.send({meggage:" Running Well "})
})).listen(port,(err)=>{
    if(err){
        console.log(" This is the error ", err);
        throw err
    }else{
        console.log(`Server is running good at port = ${port}`)
    }
})