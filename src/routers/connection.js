const express = require('express')
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth')
//Sending connection request
requestRouter.post('/sendConnectionRequest',userAuth, async(req,res)=>{
    try{
        const user = req.user
    res.send(user.firstName+' sent a connection request') 
    }
    catch (err){
        res.status(401).send('Error'+ err.message)
    }
})

module.exports = {requestRouter}