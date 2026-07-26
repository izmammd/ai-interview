const jwt = require("jsonwebtoken");

const handleAuthMiddleware = async (req, res, next) => {

    try {
        // console.log("cookie : ",req.cookies);\

        const token = req.cookies.token;

        const verifyToken = await jwt.verify(token, process.env.SECRETE_KEY);

        if (!verifyToken) {
            return res.status(401).json({ message: "user does not exist or token is deleted", success: false });
        }

        // console.log(verifyToken.userId)
        req.payload = verifyToken.userId;
        // console.log("req.payload : ",req.payload)
        next();
    }
    catch (err) {
        console.log("Error is coming from Auth Middleware ", err.message);
        return res.status(500).json({ message: "Error is coming from Auth Middleware", success: false })
    }
}

module.exports = handleAuthMiddleware;