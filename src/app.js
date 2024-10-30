const express = require('express')
const app = express();

app.use('/user',(req,res,next)=>{
    console.log('Handling route user 1')
    // res.send('Response 1')
    next();
},(req,res,next)=>{
    console.log('Handling route user 2')
    // res.send('Response 2')
    next()
},(req,res,next)=>{
    console.log('Handling route user 3')
    // res.send('Response 3')
    next()
},(req,res,next)=>{
    console.log('Handling route user 4')
    // res.send('Response 4')
    next()
},(req,res,next)=>{
    console.log('Handling route user 5')
    // res.send('Response 5')
    next()
},(req,res,next)=>{
    console.log('Handling route user 6')
    // res.send('Response 6')
})

app.listen(7777,()=>{
    console.log('Server running on port no. 7777')
})