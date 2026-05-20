const express = require("express")
const interviewRouter = express.Router();
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const authMiddleware = require("../middlewares/auth.middleware")
//@ route POST /api/interview/interview 
//@description Generate interview report on basis of self description and job description, resume pdf
//@access Private
interviewRouter.post("/",authMiddleware.authUser,upload.single('resume'),interviewController.generateInterviewReportController)

module.exports = interviewRouter;
