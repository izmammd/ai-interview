const Imagekit = require("imagekit");

const getImagekit = () => {
    const missingKeys = ["IMAGEKIT_PUBLIC_KEY", "IMAGEKIT_PRIVATE_KEY", "IMAGEKIT_URL_ENDPOINT"]
        .filter((key) => !process.env[key]);

    if (missingKeys.length) {
        const error = new Error(`ImageKit is not configured. Missing: ${missingKeys.join(", ")}`);
        error.code = "IMAGEKIT_NOT_CONFIGURED";
        throw error;
    }

    return new Imagekit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
};

module.exports = getImagekit;