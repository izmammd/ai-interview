const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: true
    },

    role: {
        type: String,
        required: true
    },

    experience: {
        type: String,
        required: true
    },

    topicsToFocus: {
        type: String,
        required: true
    },

    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "QUESTION"
    }]
}, { timestamps: true })

const SESSION = new mongoose.model("SESSION", sessionSchema)

module.exports = SESSION;