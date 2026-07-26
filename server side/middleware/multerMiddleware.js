const multer = require("multer");

const storage = multer.memoryStorage();

const uploadPhoto = new multer({
    storage
})

module.exports = uploadPhoto;
