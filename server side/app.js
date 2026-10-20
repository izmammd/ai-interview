const express = require("express");
// const dotenv = require("dotenv");
const connectDB = require("./config/DB.js");
const { configDotenv } = require("dotenv");
const userRouter = require("./router/userRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const sessionRouter = require("./router/sessionRouter.js")
const questionRouter = require("./router/questionRouter.js")

// dotenv.config();
configDotenv();
const app = express();

const frontendOrigin = process.env.CLIENT_URL || "https://ai-interview-1-l14e.onrender.com";
const allowedOrigins = new Set([frontendOrigin, "http://localhost:5173"]);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}))


app.use("/api/user",userRouter);

app.use("/api/session",sessionRouter)

app.use("/api/question",questionRouter)

const port = process.env.PORT || 5000;

app.listen(port,"0.0.0.0",()=>{
    connectDB();
    console.log(`http://localhost:${port}`)
})