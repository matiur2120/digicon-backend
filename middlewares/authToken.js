const jwt = require('jsonwebtoken')
const createError = require('http-errors')
require('dotenv').config()
const authToken = async(req, res, next) =>{
    try{
        const token = req?.cookies?.accessToken;
        console.log(req)
        console.log('Token is....')
        console.log(token)
        if(!token){
            throw createError(401, 'Access token not found. Please login')
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        if(!decoded){
            throw createError(401, 'Invalid access token. Please login again')
        }
        console.log(decoded._id)
        req.id = decoded?._id
        next()

    }catch(error){
       next(error)
    }

}


module.exports = authToken;