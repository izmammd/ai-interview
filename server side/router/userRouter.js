const express = require("express");
const { handleUserRegister, handleUserLogin, handleUserDetail, handleUserLogOut, handleUserDelete, handleUserDeleteByPassword, handleUserUpdate } = require("../controller/userController.js");
const handleAuthMiddleware = require("../middleware/authMiddleware.js")
const uploadPhoto = require("../middleware/multerMiddleware.js")

const userRouter = express.Router();

userRouter.post("/signup", handleUserRegister);

userRouter.post("/login", handleUserLogin);

userRouter.get("/detail", handleAuthMiddleware, handleUserDetail);

userRouter.get("/logout", handleAuthMiddleware, handleUserLogOut);

userRouter.delete("/delete", handleAuthMiddleware, handleUserDelete);

userRouter.post("/deletebypass", handleUserDeleteByPassword);

userRouter.post("/update",handleAuthMiddleware, uploadPhoto.single("profilePhoto"), handleUserUpdate)

module.exports = userRouter;