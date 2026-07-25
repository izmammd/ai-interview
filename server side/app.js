const express = require("express");


const app = express();

app.get("/",(req,res)=>{
    console.log("work");
})

app.listen(3000,"localhost",()=>{
    console.log("http://localhost:3000")
})