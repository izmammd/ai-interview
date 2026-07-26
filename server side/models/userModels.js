const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullName : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
        trime : true,
        lowercase : true
    },

    password : {
        type : String,
        required : true
    },

    profilePhoto : {
        type : String,
        default : ""
    }

})

const USER = new mongoose.model("USER",userSchema);


module.exports = USER;