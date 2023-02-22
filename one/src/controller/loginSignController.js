var mongoose = require('mongoose')
const db = require('../database/db');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();
var logInData = async (req, res) => {
    try {
        let data = await User.find({
            "username": req.body.username,
            "password": req.body.password
        });
        if (data.length > 0) {
            console.log(process.env.SECRET_KEY)

            const accessToken = jwt.sign({
                username: req.body.username,
                password: req.body.password
            }, process.env.SECRET_KEY, { expiresIn: 300 });
            const refreshToken = jwt.sign({
                username: req.body.username,
                password: req.body.password
            }, process.env.SECRET_KEY, { expiresIn: 700 });

            console.log(accessToken, refreshToken)
            res.status(201).json({ accessToken, refreshToken });
        } else {
            res.send("User does not exists")
        }

    }
    catch (err) {
        res.send(err)
    }
}

//  signup

var signUp = async (req, res) => {
    try {
        let data = await User.find({
            "username": req.body.username
        });
        if (data.length > 0) {
            res.send("User already exists")
        } else {          
            var Users = new User(req.body);
            Users.save((err,response)=>{
                if(!err){
                    console.log("body data", Users)
                    const accessToken = jwt.sign({
                        username: req.body.username,
                        password: req.body.password
                    }, process.env.SECRET_KEY, { expiresIn: 300 });
                    const refreshToken = jwt.sign({
                        username: req.body.username,
                        password: req.body.password
                    }, process.env.SECRET_KEY, { expiresIn: 700 });
                    console.log(accessToken, refreshToken)
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.ethereal.email',
                        port: 587,
                        auth: {
                            user: "charles.mraz@ethereal.email",
                            pass: "69Hgt25kM1bCXgm91z"
                        }
                    });
        
                    let info = transporter.sendMail({
                        from: 'Manoj Kumar <charles.mraz@ethereal.email>',
                        to: 'dreamsmanoj2017@gmail.com',
                        subject: 'Hello Manoj Kumar  ✔',
                        text: 'Hello Manoj Kumar  ✔',
                        html: '<p><b>Hello Manoj Kumar</b> to myself!</p>' 
                    })
                    res.status(201).json({ accessToken, refreshToken });
                }else{
                    res.send(err);
                }
            })
        }

    }
    catch (err) {
        res.send(err)
    }
}


//  exporting modules

 module.exports = { logInData, signUp }