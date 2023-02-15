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


//connect db
connectDB(DB);

//Routes imports
const product = require('./routes/productRoute');





app.use('/api/v1', product);
app.get('/home', (req, res)=>{
    res.send("Home api");
    console.log("success");
});

//Middleware for error
app.use(errorMiddleware);





app.listen(3000, ()=>{
    console.log(`Server listening on ${process.env.PORT}`); 
})

module.exports = app; 