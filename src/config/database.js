const mongoose = require('mongoose')

const connectDB = async ()=>{
    
    await mongoose.connect("mongodb+srv://iparwez351412:y8zXstkUKCdID6bv@namastenode.ggwuo.mongodb.net/devTinder")
}

module.exports= connectDB;

