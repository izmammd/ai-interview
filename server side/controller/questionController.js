const { GoogleGenerativeAI } = require("@google/generative-ai");
const SESSION = require("../models/sessionModels.js");
const QUESTION = require("../models/question.Models.js");


const ai = new GoogleGenerativeAI(process.env.GEN_AI)
const generateContentWithRetry = async (model, prompt) => {
    const retryableStatuses = [429, 500, 502, 503, 504];
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await model.generateContent(prompt);
        }
        catch (err) {
            if (!retryableStatuses.includes(err.status) || attempt === maxAttempts) {
                throw err;
            }

            await new Promise((resolve) => setTimeout(resolve, 1000 * (2 ** (attempt - 1))));
        }
    }
};


const handleGenerateInterviewQuestion = async (req, res) => {

    try {
        console.log("------>Question body ", req.body);
        const { role, experience, topicToFocus, topicsToFocus, sessionId } = req.body;
        const focusTopics = topicsToFocus || topicToFocus;

        const prompt = ` You are an interview question generator.

                            Return ONLY a valid JSON array.
                            Do not include markdown, code blocks, or extra text.

                            Format:
                            [
                            {
                            "question":"question text",
                            "answer":"detailed answer"
                            }
                            ]
                            Generate 10 questions for a ${role}
                            with ${experience} years experience.

                            Focus on topics:
                            ${focusTopics} `;

                            //Generate ${numberOfQuestion} questions for a ${role}

        // const prompt = `
        //                 you are an interview question generator.
        //                 Return ONLY a valid JSON array. And Explation in details and do not include any text or formatting.
        //                 Example formate : 
        //                 [
        //                 {"question" : "what is react","answer" : "React is a js library which is used for buliding a responsive UI"}
        //                 ]
        //                 Now generate ${numberOfQuestion} question for a ${role} with ${experience} year experience.
        //                 Focus on Topics ${topicToFocus.join(",")}`;

        const model = ai.getGenerativeModel({ model: "gemini-3.6-flash" });
        // const model = ai.getGenerativeModel({
        //     model: "gemini-2.5-flash"
        // });
        const result = await generateContentWithRetry(model, prompt);

        // rawText helps to remove unnecessary formatting from Gemini output
        let rawText = result.response.text();

        rawText = rawText.replace(/```json\s*/i, "");
        rawText = rawText.replace(/```$/i, "");
        rawText = rawText.trim();

        console.log("Gemini raw output:", rawText);

        const jsonMatch = rawText.match(/\[[\s\S]*\]/);

        if (!jsonMatch) {
            console.log("Gemini text did not contain a JSON array.");
            throw new Error("Invalid JSON returned from Gemini");
        }

        const data = JSON.parse(jsonMatch[0]);

        const isSession = await SESSION.findById(sessionId);

        if (!isSession) {
            return res.status(401).json({ message: "Session not found", success: false })
        }

        const createdQuestion = await QUESTION.insertMany(
            data.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        )

        await isSession.save();

        return res.status(201).json({data});
    }
    catch (err) {
        console.log("Error coming from question generate..", err.message);
        const isProviderUnavailable = [429, 500, 502, 503, 504].includes(err.status);

        return res.status(isProviderUnavailable ? (err.status === 429 ? 429 : 503) : 500).json({
            message: isProviderUnavailable
                ? "The AI service is temporarily busy. Please try again shortly."
                : err.message || "Error coming from question generate..",
            success: false
        })
    }
}

const handleTogglePinnedQuestion = async (req, res) => {

    try {
        const question = await QUESTION.findById(req.params.id);

        if (!question) {
            return res.status(401).json({ message: "Question not found", success: false })
        }

        question.isPinned = !question.isPinned;

        await question.save();

        return res.status(200).json({ message: "Question Pinned successfully",success : true,question });

    }
    catch (err) {
        console.log("Error coming from toggle Pin Question..", err.message);
        return res.status(500).json({ message: "Error coming from qtoggle Pin Question...", success: false })
    }
}

module.exports = { handleGenerateInterviewQuestion, handleTogglePinnedQuestion };