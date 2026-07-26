const express = require("express");
// const dotenv = require("dotenv");
const connectDB = require("./config/Db");
const { configDotenv } = require("dotenv");
const userRouter = require("./router/userRouter");
const cookieParser = require("cookie-parser");


const app = express();
// dotenv.config();
configDotenv();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter);

const port = process.env.PORT || 5000;

app.listen(port,"localhost",()=>{
    connectDB();
    console.log(`http://localhost:${port}`)
})