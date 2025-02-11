const CartProduct = require('../models/cartProductModel');

const addToCartProduct = async(req, res)=>{
    const {productId, quantity} = req?.body
    const userId = req?.id
    if(!productId){
        throw new Error('Please provide productId')
    }
    if(quantity <= 0){
        throw new Error('Please provide product quantity')
    }
    if(!userId){
        throw new Error('Please provide userId')
    }
    try{
        const isProductExists = await CartProduct.findOne({productId});
        if(isProductExists){
            throw new Error('Product already added!')
        }
        const response = await CartProduct.create({productId, quantity, userId})
        res.status(201).json({
            status: true,
            message: 'Product added to cart successfully',
            data: response
         })
    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }
}
const fetchCartProductsByUserId = async(req, res)=>{
    const userId = req?.id;
    if(!userId){
        throw new Error('Invalid credentials Please login')
    }
    try{
        const response = await CartProduct.find({userId}).populate('productId')
        const count = response?.length;
        res.status(201).json({
            status: true,
            message: 'Cart products fetched successfully',
            data: response
         })

    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }

}
const updateCartProduct = async(req, res)=>{
    const {id, quantity} = req?.body;
    const userId = req?.id;
    try{
        const findProduct = await CartProduct.findOne({_id: id, userId})
        if(!findProduct){
            throw new Error('Invalid credentials')
        }
        const response = await CartProduct.findOneAndUpdate({_id: id}, {quantity}, {new: true})
        console.log(response)
        res.status(200).json({
            status: true,
            message: 'Cart products updated successfully',
            data: response
         })
    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })

}}
const deleteCartProduct = async(req, res)=>{
    const {productId} = req?.body;
    const userId = req?.id;
    try{
        const findProduct = await CartProduct.findOne({_id: productId, userId})
        if(!findProduct){
            throw new Error('Invalid credentials')
        }
        const response = await CartProduct.findOneAndDelete({_id: productId})
        console.log(response)
        res.status(200).json({
            status: true,
            message: 'Cart products deleted successfully',
            data: response
         })
    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }
}



module.exports = {addToCartProduct, fetchCartProductsByUserId, updateCartProduct, deleteCartProduct}