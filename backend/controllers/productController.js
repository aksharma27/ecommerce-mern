const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncError = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');




//create product - ADMIN
exports.createProduct = asyncError(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
    // res.send("success");
})
// get all products - All
exports.getAllProducts = asyncError(async (req, res)=>{


    //PAGINATION
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    
    res.status(200).json({
        success: true,
        products
    })
});


//Update Product - ADMIN
exports.updateProduct = asyncError(async (req, res, next)=> {
    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
     }  

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
});

//delete - admin
exports.deleteProduct = asyncError(async (req, res, next)=> {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
     }

    await product.deleteOne();
    res.status(200).json({success: true, message: "Product deleted successfully"});
});


//get product details
exports.getProductDetails = asyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
       return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({success: true, product, productCount });
}   )


// module.exports = {getAllProducts};