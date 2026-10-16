const jwt = require('jsonwebtoken')
const tokenBlacklistModel = require('../models/blacklist.model')  
async function authUser(req,res,next){
    const authHeader = req.headers.authorization
    const bearerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null
    const token = req.cookies?.token || bearerToken

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(401).json({message:"Token is Invalid"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(error){
        return res.status(401).json({message:"Invalid Token"})
    }
}   

module.exports = {authUser}   