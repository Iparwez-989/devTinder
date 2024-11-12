const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email entered')
            }
            
        }
    },password:{
        type:String,
        required:true
    },age:{
        type:Number,
        required:true,
        min:15,
    },Gender:{
        type:String,
        validate(value){
                if(!["male","female","others"].includes(value))
                    {
                        throw new Error ("Gender is invalid")
                    }
            }
        
    },photoUrl:{
        type:String,
    },about:{
        type:String,
        default:"This is a default value"
    },
    skills:{
        type:[String]
    }

},{timestamps:true})  

const User = mongoose.model("user",userSchema);
module.exports=User