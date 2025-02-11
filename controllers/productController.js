const isAdmin = require('../helpers/isAdmin');
const productModel = require('../models/productModel');
const Product = require('../models/productModel')
const addProductController = async(req, res) =>{
    const {title, price, selling_price, description, images, category} = req.body;
    if(!title){
        throw new Error('Please provide product title')
    }
    if(!price){
        throw new Error('Please provide product price')
    }
    if(!selling_price){
        throw new Error('Please provide product selling price')
    }
    if(!description){
        throw new Error('Please provide product description')
    }
    if(!category){
        throw new Error('Please provide product category')
    }
    try{
        const sessionUserId = req?.id
        const checkAdmin = await isAdmin(sessionUserId)
        
        if(!checkAdmin){
            throw new Error('Access denied!')
        }
     const response = await Product.create(req.body);
  
     res.status(201).json({
        status: true,
        message: 'Product created successfully'
     })

    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }


}

const getAllProducts = async(req, res)=>{
    try{
        const response = await productModel.find().sort({createdAt: -1});
       
        res.status(200).json({
            message: 'Product fetched successfully',
            success: true,
            error: false,
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

const updateProduct = async(req, res)=>{
    const {id} = req.body
    try{
        const response = await productModel.findByIdAndUpdate(id, req.body, {new: true})
        if (!response) {
            return res.status(404).json({ message: "Product not found" });
          }
        res.status(200).json({
            message: 'Product updated successfully',
            success: true,
            error: false,
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

const getCategoryProduct = async(req, res)=>{
    try{
        const categories = await productModel.distinct('category')
        const categoryProducts = [];

        for(const category of categories){
            const product = await productModel.findOne({category})
            if(product){
                categoryProducts.push(product)
            }
        }
      
        res.status(200).json({
            message: 'Category products',
            success: true,
            error: false,
            data: categoryProducts
        })

    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }
}
const getProductsByCategory = async(req, res)=>{
    try{
        const category = req?.params?.category
        const products = await productModel.find({category: category})
        res.status(200).json({
            message: 'Products by category fetched successfully',
            success: true,
            error: false,
            data: products
        })
    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }
}

const getProductById = async(req, res) =>{
    try{
        const {productId} = req?.params
        
        const product = await productModel.findById(productId)
        res.status(200).json({
            message: 'Product fetched successfully',
            success: true,
            error: false,
            data: product
        })
    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }

}
const fetchSearchProducts = async(req, res) =>{
    const serachValue = req?.query?.q
    const regex = new RegExp(serachValue, 'i', 'g')
    try{
        const products = await Product.find({
            "$or": [{
                title: regex
            },{
                category: regex
            }]
        })
     
        res.status(200).json({
            status: true,
            message: 'Search products fetched successfully',
            data: products
         })

    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }

}

const fetchFilterProducts = async(req, res) =>{
    const categoryList = req?.body
   
    try{
        const products = await Product.find({
           category: {$in: categoryList}
        })
     
        res.status(200).json({
            status: true,
            message: 'Fiter products fetched successfully',
            data: products
         })

    }catch(error){
        res.json({
            status: false,
            message: error.Error || error.message,
            error: true
        })
    }

}

module.exports = {addProductController, getAllProducts, updateProduct, getCategoryProduct, getProductsByCategory, getProductById, fetchSearchProducts, fetchFilterProducts}