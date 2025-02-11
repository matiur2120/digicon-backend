const User = require('../models/userModel')
const currentUserInfoConroller = async(req, res) =>{
    try{
        const userId = req?.id;
        const userInfo = await User.findById(userId)
        if(userInfo){
            res.status(200).json({
                status: true,
                message: 'User info fetched successfully',
                data: userInfo,
                error: false
            })
        }

    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }

}

module.exports = currentUserInfoConroller;