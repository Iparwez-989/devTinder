const express = require('express')
const profileRouter = express.Router();
const User = require('../models/user')
const {userAuth} = require('../middlewares/auth'); 
const bcrypt = require('bcrypt')
const { validateEditProfileData } = require('../utils/validate');
// For getting profile
profileRouter.get('/profile/view',userAuth,async (req,res)=>{ 
    try{
        // const user =await User.findById(id)
        const user = req.user
        if(!user){
            throw new Error('User not found')
        } res.send(user)
    }
    catch(err){
        res.status(400).send('Unable to get profile '+ err.message)
    }
    
})
// For updating profile
profileRouter.patch('/profile/edit',userAuth, async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error('Invalid edit request')
        }
       const loggedInUser = req.user
       console.log(loggedInUser)
    //    loggedInUser.firstName = req.body.firstName;
    //    loggedInUser.lastName = req.body.lastName;
        Object.keys(req.body).forEach(key => loggedInUser[key]= req.body[key]);
       console.log(loggedInUser)
        await loggedInUser.save();
        // res.send(`${loggedInUser.firstName}, your profile has been edited successfully.`)
        res.json({message:`${loggedInUser.firstName}, your profile has been edited successfully.`,data:loggedInUser})


    }
    catch(err){
        res.status(400).send('Cannot edit profile'+err.message)
    }
})
// For updating password
profileRouter.patch('/profile/editPassword',userAuth,async (req,res)=>{

    try{
    console.log(req.user.password)
    const isPasswordValid = await bcrypt.compare(req.body.oldPassword,req.user.password)
    console.log(isPasswordValid)
    if(!isPasswordValid){
        throw new Error('Your password is incorrect')
        }
    if(isPasswordValid){
        const loggedInUser = req.user;
        if(req.body.newPassword === req.body.confirmNewPassword){
            const newPasswordHash = await bcrypt.hash(req.body.newPassword,10)
            loggedInUser.password = newPasswordHash;
            console.log(newPasswordHash)
            await loggedInUser.save()
            res.send('Password changed successfully')
        }else{
            throw new Error('Your enter the same password in confirm section')
        }
        
    }
    }
    
    catch (err){
        res.status(400).send("Error !! "+ err.message)
    }

})

// For getting users from the db
profileRouter.get('/user',async (req,res)=>{
    const userEmail = req.body.email
    try{
        console.log(userEmail)
        // const user = await User.findById({_id:userid})
        // const user = await User.findById(userid)
        const user = await User.find({email:userEmail})
        if(user.length === 0){
            res.status(404).send("User not found")
        }
        else{

            res.send(user)
        }
    }
    catch(err){
        res.status(400).send('something went wrong'+err.message)
    }

})

// For deleting the user
profileRouter.delete('/removeUser',async (req,res)=>{
    const uid = req.body.id
    try{
        const user = await User.findByIdAndDelete(uid);
        res.send("user removed successfully"+ user)
    }
    catch(err){
            
        res.status(400).send('something went wrong'+err.message)
    }
    

})

// For updating a user
profileRouter.patch('/updateUser/:userId', async (req,res)=>{
    const userId = req.params?.userId;
    // const email = req.body.email;
    const data = req.body
    console.log(data)
    try{
        const allowedUpdates=["firstName","lastName","password","skills","photoUrl","about","Gender","age"]
        const isAllowed = Object.keys(data).every((k)=>allowedUpdates.includes(k))
        if(!isAllowed){
            throw new Error('Updation not allowed')
        }
        console.log(isAllowed)
        if(data.skills && data.skills.length>5){
            throw new Error('Cannot insert more than 5 skill')
        }

    // console.log(data)
    const user = await User.findByIdAndUpdate(userId,data,{runValidators:true});
    // await User.findOneAndUpdate({email:email},data,{runValidators:true})
    // res.send(user)
    res.send("user updated successfully")
    }
    catch(err){
        res.status(400).send('something went wrong'+err.message)

    }
})

module.exports = {profileRouter}