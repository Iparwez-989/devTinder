const express = require('express')
const app = express();
const connectDB = require('./config/database')
const User = require('./models/user')

app.use(express.json())

app.use('/signup',async (req,res)=>{
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
connectDB()
.then(()=>{
    console.log('Connection established successfully')
    app.listen(7777,()=>{
        console.log('Listening on port 7777')
    })
})
.catch(()=>console.error('Database cannot be connected '))

