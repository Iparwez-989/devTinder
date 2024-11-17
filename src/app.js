const express = require('express')
const app = express();
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser')
const {userAuth} = require('./middlewares/auth')

app.use(express.json())
app.use(cookieParser())
const {authRouter} = require('./routers/auth')
const {profileRouter} = require('./routers/profile')
const {requestRouter} = require('./routers/connection')
app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)








connectDB()
.then(()=>{
    console.log('Connection established successfully')
    app.listen(7777,()=>{
        console.log('Listening on port 7777')
    })
})
.catch(()=>console.error('Database cannot be connected '))

