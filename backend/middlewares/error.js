const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //WRONG MONGODB ID ERROR
    if(err.name ==="CastError"){
        const msg = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(msg, 400);
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};