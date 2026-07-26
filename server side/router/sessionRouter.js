const express = require("express");
const {handleSessionCreate, handleGetSession, handleGetSessionById, handleDeleteSession} = require("../controller/sessionController.js");
const handleAuthMiddleware = require("../middleware/authMiddleware.js");

const sessionRouter = express.Router();

// sessionRouter.get("/",(req,res) => {
//     res.send("session work")
// })

sessionRouter.post("/createSession",handleAuthMiddleware,handleSessionCreate)

sessionRouter.get("/getSession",handleAuthMiddleware,handleGetSession);

sessionRouter.get("/getSessionById/:id",handleAuthMiddleware,handleGetSessionById);

sessionRouter.delete("/deleteSession/:id",handleAuthMiddleware,handleDeleteSession)
module.exports = sessionRouter;