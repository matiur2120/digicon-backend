const userLogoutController = async(req, res)=>{
    try{
        res.clearCookie("accessToken")
        if(req.id){
            delete req.id
        }
        res.json({
            status: true,
            message: 'User logout successfully',
            error: false
        })

    }catch(error){
        res.json({
            status: false,
            message: error.message,
            error: true
        })

    }
}

module.exports = userLogoutController;