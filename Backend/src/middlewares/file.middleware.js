const multer = require("multer")
const upload = multer({storage: multer.memoryStorage(),limits:{
    fileSize:3*1024*1024
}
})

upload.single('resume');

const validateFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    next();
}

module.exports = { upload, validateFile }