const jwt = require("jsonwebtoken");

const handleAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies && req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Authentication required", success: false });
        }

        const verifyToken = await jwt.verify(token, process.env.SECRETE_KEY);

        req.payload = verifyToken.userId;
        next();
    }
    catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid or expired authentication token", success: false });
        }

        console.log("Error is coming from Auth Middleware ", err.message);
        return res.status(500).json({ message: "Error is coming from Auth Middleware", success: false })
    }
}

module.exports = handleAuthMiddleware;