const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{type:String,unique:[true,"Username already taken"],required:true},
    email:{type:String,unique:[true,"Account already registered with this email"],required:true},
    password:{type:String,required:[true,"Password is required"]}
})

const User = mongoose.model("users",userSchema)
module.exports = User