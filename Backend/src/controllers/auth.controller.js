const userModel = require('../models/user.model')
const tokenBlacklistModel = require('../models/blacklist.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * 
 * @name registerUserController
 * @description This function is used to register a new user
 * @access Public
 * 
 */
async function registerUserController(req,res){
    const {username,email,password} = req.body
    if(!username||!email||!password){
        return res.status(400).json({message:"All fields are required"})
    }
    const isUserExist = await userModel.findOne({
        $or:[{username},{email}]
    })
    if(isUserExist){
        return res.status(400).json({message:"User already exists"})
    }
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password,salt)
    const user = await userModel.create({username,email,password:passwordHash})
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)
    res.json({message:"User registered successfully",
        user:{id:user._id,username:user.username,email:user.email}
    })


}

/**
 * 
 * @name loginUserController
 * @description This function is used to login a user
 * @access Public
 * 
 */
async function loginUserController(req,res){
    const {email,password} = req.body
    if(!email||!password){
        return res.status(400).json({message:"Email and password are required"})
    }
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)
    res.status(200).json({message:"User logged in successfully",
        user:{id:user._id,username:user.username,email:user.email}
    })
    
}

/**
 * 
 * @name logoutUserController
 * @description This function is used to logout a user
 * @access Public
 * 
 */
async function logoutUserController(req,res){
    const token = req.cookies.token
    if(token){
        await tokenBlacklistModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({message:"User logged out successfully"})

}

async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}
module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}