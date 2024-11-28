const express = require('express');
const { userAuth } = require('../middlewares/auth');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest')
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
module.exports = {userRouter};