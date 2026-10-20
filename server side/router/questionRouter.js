const express = require("express");

const {handleGenerateInterviewQuestion, handleTogglePinnedQuestion} = require("../controller/questionController.js");
const handleAuthMiddleware  = require("../middleware/authMiddleware.js");


const questionRouter = express.Router();


// questionRouter.get("/",(req,res) =>{
//     res.send("question router work...")
// })

questionRouter.post("/generateQuestion",handleAuthMiddleware,handleGenerateInterviewQuestion);
questionRouter.post("/toggleQuestion/:id",handleAuthMiddleware,handleTogglePinnedQuestion);

module.exports = questionRouter; 