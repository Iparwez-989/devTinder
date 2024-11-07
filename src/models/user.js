const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },password:{
        type:String,
    },age:{
        type:Number,
    },Gender:{
        type:String
    }

})  

const User = mongoose.model("user",userSchema);
module.exports=User