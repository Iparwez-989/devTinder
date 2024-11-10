const express = require('express')
const app = express();
const connectDB = require('./config/database')
const User = require('./models/user')

app.use(express.json())
// For adding user to the db
app.post('/signup',async (req,res)=>{
    console.log(req.body)
    const user = new User(req.body)

    try{
        
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
app.patch('/updateUser', async (req,res)=>{
    try{
    // const userId = req.body.userId
    const email = req.body.email;
    const data = req.body
    console.log(data)
    // const user = await User.findByIdAndUpdate(userId,data);
    await User.findOneAndUpdate({email:email},data,{runValidators:true})
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

