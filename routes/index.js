const express = require('express');

const userSignUpController = require('../controllers/userSignUp');

const currentUserInfoConroller = require('../controllers/currentUserInfo')
const authToken = require('../middlewares/authToken');
const userLogoutController = require('../controllers/userLogout');
const getAllUserController = require('../controllers/allusers');
const { addProductController, getAllProducts, updateProduct, getCategoryProduct, getProductsByCategory, getProductById, fetchSearchProducts, fetchFilterProducts } = require('../controllers/productController');
const { addToCartProduct, fetchCartProductsByUserId, updateCartProduct,deleteCartProduct } = require('../controllers/cartProductController');
const userSignInController = require('../controllers/userSignin');



const router = express.Router();
router.post('/users/signup', userSignUpController)
router.post('/users/signin', userSignInController)
router.get('/users/current-user-info', authToken, currentUserInfoConroller);
router.get('/users/logout', userLogoutController)


//Admin panel router
router.get('/dashboard/users', authToken, getAllUserController)
router.post('/dashboard/products', authToken, addProductController);
router.get('/products', getAllProducts);
router.get('/products/:category', getProductsByCategory)
router.get('/product-details/:productId', getProductById)
router.put('/products', authToken, updateProduct)
router.get('/search', fetchSearchProducts)
router.post('/fiter-products', fetchFilterProducts)
//Home page
router.get('/category-product', getCategoryProduct)
//Product cart api
router.get('/cart/get-cartproducts', authToken, fetchCartProductsByUserId)
router.post('/cart/products', authToken, addToCartProduct)
router.put('/cart/products', authToken, updateCartProduct)
router.delete('/cart/products', authToken, deleteCartProduct)







module.exports = router;