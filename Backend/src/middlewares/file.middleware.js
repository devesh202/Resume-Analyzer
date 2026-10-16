const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
})

const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "File is too large. Maximum allowed size is 10MB."
            })
        }
        return res.status(400).json({
            success: false,
            message: `File upload error: ${err.message}`
        })
    }
    next(err)
}

const validateFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    next();
}

module.exports = { upload, handleMulterError, validateFile }