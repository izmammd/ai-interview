const express = require("express");
// const dotenv = require("dotenv");
const connectDB = require("./config/Db");
const { configDotenv } = require("dotenv");
const userRouter = require("./router/userRouter");
const cookieParser = require("cookie-parser");

const sessionRouter = require("./router/sessionRouter.js")

// dotenv.config();
configDotenv();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}))

app.use("/api/user",userRouter);

app.use("/api/session",sessionRouter)

const port = process.env.PORT || 5000;

app.listen(port,"localhost",()=>{
    connectDB();
    console.log(`http://localhost:${port}`)
})