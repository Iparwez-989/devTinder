const jwt = require('jsonwebtoken')
const User = require('../models/user')
const userAuth = async(req,res,next)=>{
    try{
    const {token} = req.cookies;
    if(!token){
        throw new Error('Invalid token !!!!!')
    }
    const decodedMsg = await jwt.verify(token,"DevTinder@")
    const {id} = decodedMsg;
    const user =await User.findById(id);
    if(!user){
        throw new Error('User not found')
    }
    req.user = user;
    next();
    }
    catch (err){
        res.status(400).send('User auth failed '+err.message)
    }

}

module.exports={userAuth}