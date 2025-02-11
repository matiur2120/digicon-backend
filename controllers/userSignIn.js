const bcrypt = require('bcryptjs'); 
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const userSignInController = async(req, res)=>{
    const {email, password} = req.body;
    try{
        if(!email){
            throw new Error('Please provide email')
        }
        if(!password){
            throw new Error('Please provide password')
        }
        const userInfo = await User.findOne({email})
        console.log('User info')
        console.log(userInfo)
        if(!userInfo){
            throw new Error('User does not exitst with this email. Please register first');
        }
        const isPasswordMatch = await bcrypt.compare(password, userInfo.password)
        if(!isPasswordMatch){
            throw new Error('Invalid credentials')
        }
        const userWithOutPassword = userInfo.toObject();
        delete userWithOutPassword.password;
        const token = jwt.sign(
            {_id: userInfo._id, email: userInfo.email}
          ,process.env.JWT_SECRET, { expiresIn: 60 * 60 });

        res.cookie('accessToken', token, {
        maxAge: 60 * 60 * 1000, // 5 min
        httpOnly: true,
        secure: true,
        //sameSite: 'none'
        })
        
        res.status(200).json({
            status: true,
            message: 'User login successfully',
            data: userWithOutPassword
        })

    }catch(error){
        console.log(error.message)
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }

}

module.exports = userSignInController;