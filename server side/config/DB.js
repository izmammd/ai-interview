const mongoose = require("mongoose");

const connectDB = async (req,res) =>{
    try{
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("DB connected....")
    }
    catch(err){
        console.log("Error comes from DB connection..",err)
    }
}

module.exports = connectDB;