const Product = require('../models/productModel');




//create product - ADMIN
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
    // res.send("success");
}
// get all products - All
exports.getAllProducts = async (req, res)=>{
    const products = await Product.find();
    
    res.status(200).json({
        success: true,
        products
    })
};


//Update Product - ADMIN
exports.updateProduct = async (req, res, next)=> {
    let product = Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
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
};

//delete - admin
exports.deleteProduct = async (req, res, next)=> {
    const product = await Product.findById(req.params.id);

    if(!product){
        res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    await product.delte();
    res.status(200).json({success: true, message: "Product deleted successfully"});
}



// module.exports = {getAllProducts};