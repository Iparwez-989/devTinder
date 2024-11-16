const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

userSchema.methods.getJWT= async function(){
    const user = this;
    const token = await jwt.sign({id:user._id},"DevTinder@",{expiresIn:'1h'})
    return token;
}

userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("user",userSchema);
module.exports=User