const express = require('express');
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails} = require('../controllers/productController');
const router = express.Router();


router.get('/products', getAllProducts);
router.post('/product/new', createProduct);

//update product
router.put('/product/:id', updateProduct);

//delete Product
router.delete("/product/:id", deleteProduct);
//get one product
router.get("/product/:id", getProductDetails);



module.exports = router;