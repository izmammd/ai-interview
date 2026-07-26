const { configDotenv } = require("dotenv");
const Imagekit = require("imagekit");

configDotenv()

const imagekit = new Imagekit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
})

module.exports = imagekit