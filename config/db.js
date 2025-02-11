const mongoose = require('mongoose');
require('dotenv').config()

async function connectDB(){
    try{
        const response = await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connect successfylly')
    }catch(error){
        console.log(error.message)
    }
}

module.exports = connectDB;