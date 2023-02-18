const express = require('express');
const errorMiddleware = require('./middlewares/error'); 
// const dotenv = require('dotenv');
//Config
// dotenv.config({path:'../backend/config/config.env'});
require('dotenv').config({path: '../config.env'});
const DB = process.env.DB;
const PORT = process.env.PORT;
const connectDB = require("./config/db");
const app = express();
app.use(express.json());

//Handeling uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to Uncaught Exception`);
    process.exit(1);
});



//connect db
connectDB(DB);

//Routes imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');





app.use('/api/v1', product);
app.use('/api/v1', user);

//Middleware for error
app.use(errorMiddleware);







const server = app.listen(3000, ()=>{
    console.log(`Server listening on ${process.env.PORT}`); 
})

//Unhandled Promise Rejection => wrong server credentials like db strings, wrong pass of dp etc.. then crash the server asap
process.on('unhandledRejection', (err) => { 
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
});



module.exports = app; 