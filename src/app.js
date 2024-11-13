const express = require('express')
const app = express();
const connectDB = require('./config/database')
const User = require('./models/user')
const {validateSignupData} = require('./utils/validate')
const bcrypt = require('bcrypt')
const validator = require('validator')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

// for logging in
app.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body
        if(!validator.isEmail(email)){
            throw new Error('Enter correct email address')
        }
        else{
            const user = await User.findOne({email:email})
            if(!user){
                throw new Error('User not found')
            }else{
                const isPasswordValid = await bcrypt.compare(password,user.password)
                if(isPasswordValid){
                    res.cookie('token',"abcdefghijklmnopqrstuvwxyz")
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
// For getting profile
app.get('/profile',async (req,res)=>{
    const cookies = req.cookies;
    // const {token} = cookies;
    console.log(cookies)
    res.send('Reading cookies')
})
// For adding user to the db
app.post('/signup',async (req,res)=>{
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
// For getting users from the db
app.get('/user',async (req,res)=>{
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
app.delete('/removeUser',async (req,res)=>{
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
app.patch('/updateUser/:userId', async (req,res)=>{
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
connectDB()
.then(()=>{
    console.log('Connection established successfully')
    app.listen(7777,()=>{
        console.log('Listening on port 7777')
    })
})
.catch(()=>console.error('Database cannot be connected '))

