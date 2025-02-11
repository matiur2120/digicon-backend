
const User = require('../models/userModel')
const getAllUserController = async(req, res)=>{
    try{
        const userId = req?.id;
        if(!userId){
            throw new Error('User not loggedin. Please login')
        }
        const response = await User.find({});
        if(!response) throw new Error('No users found!')
        res.status(200).json({
            status: true,
            message: 'All users data fetched successfully',
            data: response,
            error: false
        })

    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }
}

module.exports = getAllUserController;