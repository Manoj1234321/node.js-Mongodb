const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

var authenticateUser = (req,res,next)=>{
    console.log("mmmmmmm")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null){
       return res.sendStatus(401);
    }else{
        jwt.verify(token, process.env.SECRET_KEY,(error, result)=>{
            if(!error){
                next();
            }else{
                return res.sendStatus(403);
            }
        })
    }
}

module.exports = { authenticateUser }