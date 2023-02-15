const mongoose = require('mongoose');
// const DB = process.env.DB;


const connect = (DB) => {
    mongoose.set('strictQuery', true);
    mongoose.connect("mongodb+srv://abhishek27:KqJKsood044BjexN@cluster0.h2jr7ip.mongodb.net/Ecommerce?retryWrites=true&w=majority", 
        {useNewUrlParser: true, useUnifiedTopology: true}).then((data)=>
            {
        console.log(`successfylly db connected : ${data.connection.host} ` );
    }).catch((err)=>
    {
        console.log('Error: ' + err);
    })
}

module.exports = connect;