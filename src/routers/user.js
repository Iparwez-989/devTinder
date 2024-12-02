const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest')
const USER_SAFE_DATA = "firstName lastName about skills"
const User = require('../models/user')
// Get all the pending connection request for loggedIn User
userRouter.get('/user/request/received',userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status:"interested"

        }).populate("fromUserId",['firstName','lastName','about','skills'])
        if(connectionRequest.length === 0){
            return res.status(400).send('No new connection request')
        }else{

            res.json({message:"Received Requests",data:connectionRequest})
        }

    }
    catch(err){
        res.status(400).send('Failed to fetch received requests '+ err.message)
    }

})
// Get all the connections
userRouter.get('/user/connection',userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},
                
            ]
        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName")
        const data = connectionRequest.map(row =>{
            if(loggedInUser._id.toString() === row.fromUserId._id.toString()){
                return row.toUserId;
            }  
            return row.fromUserId;
        } 
        )
        res.json({message:'Your connections',data})
    }
    catch(err){
        res.status(400).send("Error in fetching connection list",err.message)
    }
})
// Feed page
userRouter.get('/feed',userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50? 50 : limit;
        const skip = (page-1)*limit;
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId status").populate("fromUserId","firstName").populate("toUserId","firstName")
        const hiddenUser = new Set(); // it will not contain repeated value
        connectionRequest.forEach((req)=>{
            hiddenUser.add(req.fromUserId._id.toString());
            hiddenUser.add(req.toUserId._id.toString());
        })
        // hiddenUser are the user to whom connection req has been sent accepted or rejected
        // And there is no need to show those users in our feed page
        const feedUser = await User.find({
            $and:[
                {_id:{$nin:Array.from(hiddenUser)}},// fetch the user which is not in hidden user
                {_id:{$ne:loggedInUser._id}}
            ]
            
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        
        res.send(feedUser)
    }
    catch(err){
        res.status(400).send('Error in fetching feed '+ err.message)
    }
})
module.exports = {userRouter};