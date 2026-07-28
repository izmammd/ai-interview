const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SESSION",
        required: true
    },

    question: {
        type: String
    },

    answer: {
        type: String
    },

    note: {
        type: String
    },

    isPinned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const QUESTION = new mongoose.model("QUESTION", questionSchema);

module.exports = QUESTION;