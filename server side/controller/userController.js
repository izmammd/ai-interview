const USER = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const imagekit = require("../config/imagekit.js")


const handleUserRegister = async (req, res) => {

    try {
        if (req.body == undefined) {
            return res.status(400).json({ message: "please pass the data" });
        }

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(401).json({ message: "Field cannot be empty" });
        }

        const isUser = await USER.findOne({ email });

        if (isUser) {
            return res.status(409).json({ message: "user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await USER.create({ fullName, email, password: hashedPassword });

        return res.status(201).json({ message: "Register successful..", newUser, success: true })


    }
    catch (err) {
        console.log("Error comes from User Register...", err.message);
        return res.status(500).json({ message: "Error comes from User Register..." });
    }
}

const handleUserLogin = async (req, res) => {

    try {
        if (req.body == undefined) {
            return res.status(400).json({ message: "please pass the data", success: false });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: "Field cannot be empty", success: false });
        }

        // console.log("login email", email)
        const isUser = await USER.findOne({ email });

        // console.log("isUser Login : ", isUser)
        if (!isUser) {
            return res.status(404).json({ message: "User does not exists", success: false });
        }

        const isPassword = await bcrypt.compare(password, isUser.password);
        console.log(isPassword);

        if (!isPassword) {
            return res.status(400).json({ message: "Password incorrect", success: false });
        }

        const token = await jwt.sign({ userId: isUser._id, email: isUser.email }, process.env.SECRETE_KEY, { expiresIn: "1d" });
        // console.log("token", token);
        return res.cookie("token", token, { httpOnly: true }).status(200).json({ message: `${isUser.fullName} login successfully.`, success: true })
        // return res.status(200).json({ message: `${isUser.fullName} login successfully.`, success: true })


    }
    catch (err) {
        console.log("Error comes from User Login..", err.message)
        return res.status(500).json({ message: "Error comes from User Login..", success: false })
    }
}

const handleUserDetail = async (req, res) => {

    try {
        if (req.payload == undefined) {
            return res.status(400).json({ message: "token expired or user is no longer", success: false });
        }

        // console.log("req payload : ",req.payload)
        const id = req.payload;

        const isUser = await USER.findById(id).select("-password");

        if (!isUser) {
            return res.status(404).json({ message: "User does not exists", success: false });
        }

        return res.status(200).json({ success: true, isUser });


    }
    catch (err) {
        console.log("Error comeing from User detail...", err.message)
        return res.status(500).json({ message: "Error comes from User Login..", success: false })
    }
}

const handleUserLogOut = async (req, res) => {

    try {

        console.log("LOGOUT CONTROLLER RUNNING");
        if (req.payload == undefined) {
            return res.status(400).json({ message: "token expired or user is no longer", success: false });
        }

        // console.log("req payload : ",req.payload)
        const id = req.payload;

        const isUser = await USER.findById(id).select("-password");

        if (!isUser) {
            return res.status(404).json({ message: "User does not exists", success: false });
        }

        return res.cookie("token", "", { maxAge: 0 }).json({ message: `${isUser.fullName} LogOut successfuly` })
    }
    catch (err) {
        console.log("Error comes from User Logout..", err.message)
        return res.status(500).json({ message: "Error comes from User delete.." })
    }
}

const handleUserDelete = async (req, res) => {

    try {

        if (req.body == undefined) {
            return res.status(400).json({ message: "All the field is mandatory", success: false });
        }

        if (req.payload == undefined) {
            return res.status(400).json({ message: "token expired or user is no longer", success: false });
        }

        // console.log("req payload : ",req.payload)
        const id = req.payload;

        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Fill the password...", success: false })
        }

        console.log("password delte user: ", password)
        const isUser = await USER.findById(id);

        if (!isUser) {
            return res.status(404).json({ message: "User does not exists", success: false });
        }

        console.log("password before user: ", isUser.password)
        const isPassword = await bcrypt.compare(password, isUser.password);

        console.log("password after user: ", isUser.password)
        if (!isPassword) {
            return res.status(409).json({ message: "password invalid", success: false });
        }

        const userFullName = isUser.fullName;
        await isUser.deleteOne();

        return res.status(200).json({ message: `${userFullName} delete successfully..`, success: true })
    }
    catch (err) {
        console.log("Error comes from User Logout..", err.message)
        return res.status(500).json({ message: "Error comes from User Logout.." })
    }
}

const handleUserDeleteByPassword = async (req, res) => {

    try {
        if (req.body == undefined) {
            return res.status(400).json({ message: "please pass the data", success: false });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: "Field cannot be empty", success: false });
        }

        const isUser = await USER.findOne({ email });

        if (!isUser) {
            return res.status(401).json({ message: "email invalid", success: false })
        }

        const isPassword = await bcrypt.compare(password, isUser.password);

        if (!isPassword) {
            return res.status(401).json({ message: "User password is Invalid", success: false });
        }

        await isUser.deleteOne();

        return res.status(200).json({ message: "User delete successfully..", success: true });
    }
    catch (err) {
        console.log("Error comes from User delete by Password..", err.message)
        return res.status(500).json({ message: "Error comes from User delete by Password..", success: false })
    }
}

const handleUserUpdate = async (req, res) => {

    try {
        if (req.body == undefined) {
            return res.status(400).json({ message: "please pass the data", success: false });
        }

        const { fullName, password, newPassword } = req.body;

        const profilePhoto = req.file;

        const id = req.payload;

        const isUser = await USER.findById(id);

        if (!isUser) {
            return res.status(401).json({ message: "User email invalid", success: false })
        }

        // FOR UPDATE PROFILE PHOTO IF PROVIDED
        if (profilePhoto) {

            const uploadImage = await imagekit.upload({
                file: profilePhoto.buffer,
                fileName: profilePhoto.originalname
            })
            isUser.profilePhoto = uploadImage.url
        }

        // Update name if provided
        if (fullName) {
            if(fullName == isUser.fullName){
                return res.status(401).json({message : "User not cannot be same"})
            }
            isUser.fullName = fullName;
        }

        // Update password only if user sends password
        if (password && newPassword) {

            const isPassword = await bcrypt.compare(password, isUser.password);

            if (!isPassword) {
                return res.status(400).json({ message: "Password is Invalid", success: false })
            }

            const isSamePassword = await bcrypt.compare(newPassword,isUser.password)

            if (isSamePassword) {
                return res.status(400).json({ message: "User password cannot be same as old password", success: false })
            }

            const updatePassword = await bcrypt.hash(newPassword, 10);
        }

        await isUser.save();

        return res.status(200).json({ message: `update user details successfully`, success: true })

    }
    catch (err) {
        console.log("Error comes from User Update..", err.message)
        return res.status(500).json({ message: "Error comes from User Upadate..",success:false })
    }

}

module.exports = { handleUserRegister, handleUserLogin, handleUserDetail, handleUserLogOut, handleUserDelete, handleUserDeleteByPassword, handleUserUpdate }