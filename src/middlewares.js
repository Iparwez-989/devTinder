const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/authDemo');
const app = express();

// app.use('/user',(req,res,next)=>{
//     console.log('Handling route user 1')
//     // res.send('Response 1')
//     next();
// },(req,res,next)=>{
//     console.log('Handling route user 2')
//     // res.send('Response 2')
//     next()
// },(req,res,next)=>{
//     console.log('Handling route user 3')
//     // res.send('Response 3')
//     next()
// },(req,res,next)=>{
//     console.log('Handling route user 4')
//     // res.send('Response 4')
//     next()
// },(req,res,next)=>{
//     console.log('Handling route user 5')
//     // res.send('Response 5')
//     next()
// },(req,res,next)=>{
//     console.log('Handling route user 6')
//     res.send('Response 6')
// })
app.use('/user',userAuth)

app.get('/user/data',userAuth,(req,res)=>{
    res.send('hello from user')
})
app.post('/user/login',(req,res)=>{
    res.send('user logged in successfully')
})

app.use('/admin',adminAuth)

app.get('/admin/getAllData',(req,res)=>{
    // Logic to check if the request is authorized
    // const token = "xyz"
    // const isAuthorized = token==='xyz';
    // if(isAuthorized){
        res.send('All data sent')
    // }
    // else{
    //     res.status(401).send('Unauthorized Access')
    // }
})
app.get('/admin/deleteUser',(req,res)=>{
    // Logic for checking if the request is authorized 
    // const token = "xyz"
    // const isAuthorized = token==='xyz';
    // if(isAuthorized){
        res.send('Deleted a user')
    // }
    // else{
    //     res.status(401).send('Unauthorized Access')
    // }
    
})

app.listen(7777,()=>{
    console.log('Server running on port no. 7777')
})