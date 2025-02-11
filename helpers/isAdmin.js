const userModel = require("../models/userModel");

const isAdmin = async(userId) =>{
    try{
        const findUser = await userModel.findById(userId);
        console.log(findUser)
        if(findUser.role !== 'admin'){
            return false;
        }
        return true;
    }catch(error){
        throw error;
    }

}

module.exports = isAdmin;