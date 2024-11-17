const express = require('express')
const authRouter = express.Router();
const User = require('../models/user')
const {validateSignupData} = require('../utils/validate')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
// For adding user to the db
authRouter.post('/signup',async (req,res)=>{
    console.log(req.body)
    const {firstName,lastName,email,password,age} = req.body;
    try{
    // validation
            validateSignupData(req)
    // Encryption
        const passwordHash = await bcrypt.hash(password,10)
        console.log(passwordHash)

    const user = new User({
        firstName,
        lastName,
        email,
        password:passwordHash,
        age
    })
        if(req.body.skills && req.body.skills.length>5 ){
            throw new Error('Cannot insert More than 5 skills')
        }
    await user.save();
    res.send("User added successfully")
    }
    catch(err){
        res.status(400).send("Failed to add user."+ err.message)
    }

})
// for logging in
authRouter.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        // validations
        if(!validator.isEmail(email)){
            throw new Error('Enter correct email address')
        }
        else{
            const user = await User.findOne({email:email})
            if(!user){
                throw new Error('User not found')
            }else{
                // This validatePassword is coming from userSchema(mongoose)
                const isPasswordValid = await user.validatePassword(password)
                // const isPasswordValid = await bcrypt.compare(password,user.password)
                if(isPasswordValid){
                    // creating jwt tokens
                    const jwtToken = await user.getJWT();
                    console.log(jwtToken);
                    res.cookie('token',jwtToken,{expires:new Date(Date.now()+3600000)})
                    // this cookie will expire after one hour
                    res.send('Login successfull')
                }else{
                    throw new Error('Invalid password!')
                }
            }
        }
    }
    catch(err){
        res.status(400).send('Error occured'+ err.message)
    }
})

authRouter.post('/logout',async(req,res)=>{
    try{
        res.clearCookie('token')
        // or we can do it as 
        // res.cookie('token',null',{expires: new Date.now()})
        res.send('user logged out')
    }
    catch(err){
        res.status(401).send('Error in logging out'+ err.message)
    }
})

module.exports = {authRouter};