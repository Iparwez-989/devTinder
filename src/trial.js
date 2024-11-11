const express = require('express')
const app = express();

app.get(/.*fly$/,(req,res)=>{
    res.send({"First Name":"Irfan","Last Name":"Parwez"})
})

app.get("/user",(req,res)=>{
    console.log(req.query)
    res.send({"First Name":"Irfan","Last Name":"Parwez"})
})
app.get("/user/:userID/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send({"First Name":"Irfan","Last Name":"Parwez"})
})
app.post('/user',(req,res)=>{
    res.send('Data saved to db')
})
app.patch('/user',(req,res)=>{
    res.send("patch called ")
})
app.delete('/user',(req,res)=>{
    res.send('Data deleted successfully')
})
app.use("/test",(req,res)=>{
    res.send('This is /test page')
})


app.listen(7777,()=>{
    console.log('Server running on port no. 7777')
})