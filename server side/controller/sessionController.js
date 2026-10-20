const { populate } = require("dotenv");
const SESSION = require("../models/sessionModels.js");
const USER = require("../models/userModels.js");
const { options } = require("../router/userRouter.js");
const QUESTION = require("../models/question.Models.js")

const handleSessionCreate = async (req, res) => {

    try {
        if (req.body == undefined) {
            return res.status(401).json({ message: "All the field is mandatory..", success: false });
        }

        const { role, experience, topicsToFocus } = req.body;

        
        if (!role || !experience || !topicsToFocus) {
            return res.status(401).json({ message: "Please fill all the fiels..", success: false });
        }

        if (req.payload == undefined) {
            return res.status(401).json({ message: "token is expired or user doenot exists", success: false });
        }

        const id = req.payload;

        const isSession = await SESSION.create({
            user: id,
            role,
            experience,
            topicsToFocus
        })

        return res.status(200).json({ message: "Session is created successfully..", isSession, success: true });
    }
    catch (err) {
        console.log("Error coming from Session Create...", err.message);
        return res.status(500).json({ message: "Error coming from Session...", success: false })
    }
}

const handleGetSession = async (req, res) => {

    try {
        if (req.payload == undefined) {
            return res.status(401).json({ message: "token is expired or user doenot exists", success: false });
        }

        const id = req.payload;
        console.log("ID : ", id)
        const sessions = await SESSION.find({ user: id }).sort({ createdAt: -1 }).populate("questions");

        // console.log("get sessions : ", sessions)
        return res.status(200).json({ sessions, success: true });
    }
    catch (err) {
        console.log("Error coming from Get Session...", err.message);
        return res.status(500).json({ message: "Error coming from Get Session...", success: false })
    }
}

const handleGetSessionById = async (req, res) => {

    try {
        const isSession = await SESSION.findById(req.params.id)
            .sort({ createdAt: -1 })
            .populate({
                path: "questions",
                options: {
                    sort: { isPinned: -1 },
                    createdAt: -1
                }
            })

        return res.status(201).json({ isSession, success: false });

    }
    catch (err) {
        console.log("Error coming from Get Session By Id...", err.message);
        return res.status(500).json({ message: "Error coming from Get Session By Id...", success: false })
    }
}

const handleDeleteSession = async (req, res) => {
    try {
        const isSession = await SESSION.findById(req.params.id);

        if (!isSession) {
            return res.status(401).json({ message: "Session is not Found", success: false });
        }

        await QUESTION.deleteMany({ session: isSession._id });
        // await QUESTION.deleteOne();
        await SESSION.findByIdAndDelete(isSession._id);

        return res.status(201).json({ message: "Session deleted successfully.", success: true });
    }
    catch (err) {
        console.log("Error coming from delete Session...", err.message);
        return res.status(500).json({ message: "Error coming from delete Session...", success: false })
    }
}


module.exports = { handleSessionCreate, handleGetSession, handleGetSessionById, handleDeleteSession }