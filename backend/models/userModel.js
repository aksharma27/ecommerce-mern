const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    
    name: {
        type :String,
        required: [true, "Please enter your name"],
        maxLength:[30, "Name cannnot exceed 30 chars"], 
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email"]
    },
    password:{
        type: String, 
        required: [true, "Please enter your password"], 
        minLength: [8, "password must be at least 8 characters"],
        select: false //leaving password all will be thrown
    },
    avatar: {
        public_id: {
             type : String,
             required: true
        }, 
        url: {
             type: String,
             required: true
        }
       
    }, 
    role: {
        type : String,
        default: "user"
    }, 
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

userSchema.pre("save", async function(next){        //cannot use  this keyword in arrow function
    //if user name is changing, but pass is already hashed, for that if-else condition
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model("User", userSchema);