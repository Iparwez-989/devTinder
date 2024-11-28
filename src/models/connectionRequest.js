const mongoose = require('mongoose')
const User = require('./user')
const connectionRequestSchema = new mongoose.Schema(
    {
    fromUserId:{
       type: mongoose.Schema.Types.ObjectId,
       ref:User,    // this will refer to user Schema
       required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required: true
    },
    status:{
        type: String,
        enum:{
            values : ["ignored","interested","accepted","rejected"],
            message: '{VALUE} is incorrect status type.'
        }
    }


},{timestamps:true})

const connectionRequestModel =new mongoose.model('connectionRequest',connectionRequestSchema)
module.exports = connectionRequestModel