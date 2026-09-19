const mongoose = require("mongoose")
async function connectToDB() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables")
    }
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database")
    }catch(err){
        console.log(err)
        throw err
    }   
}

module.exports = connectToDB