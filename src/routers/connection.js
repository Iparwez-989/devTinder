const express = require('express')
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest')
const User = require('../models/user')
//Sending connection request
requestRouter.post('/request/send/:status/:toUserId',userAuth, async(req,res)=>{
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status

        const allowedStatus = ["interested","ignored"]
        if(!allowedStatus.includes(status))
            {
                return res.status(400).send("Invalid status")

            }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId:toUserId,toUserId:fromUserId},
                 //This checks if there is already a request where the user (toUserId) received a request from the current user (fromUserId).
                 {fromUserId:fromUserId,toUserId:toUserId}
                 //Basically it will check if fromUserId and toUserId is already present in db
            ]
        })
        if(existingConnectionRequest){
            throw new Error(" Request already exists")
        }
        const existingToUser = await User.findById(toUserId)
        if(!existingToUser){
            return res.status(404).send("User not found")
        }
        if(fromUserId.equals(toUserId)){
            throw new Error("Cannot send request to self.")
        }
        const connectionRequests = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const userData = await connectionRequests.save();
        res.json({message:`${req.user.firstName} sent a connection request.`,data:userData})

        
    }
    catch (err){
        res.status(401).send('Error '+ err.message)
    }
})

module.exports = {requestRouter}