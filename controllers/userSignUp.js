const User = require('../models/userModel')
const userSignUpController = async(req, res)=>{
    try{
const {email, password, name, profilePic} = req.body;
    if(!email){
        throw new Error('Please provide email')
    }
    if(!password){
        throw new Error('Please provide password')
    }
    if(!name){
        throw new Error('Please provide name')
    }
    const isUserExists = await User.findOne({email});
    if(isUserExists){
        throw new Error('User alrady exists.')
    }
    const response =  await User.create(req.body);
    res.status(201).json({
        status: true,
        message: 'User was created successfully',
    })
    }catch(error){
        console.log(error)
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }
}


module.exports = userSignUpController;