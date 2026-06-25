const express = require("express")
const interviewRouter = express.Router();
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const authMiddleware = require("../middlewares/auth.middleware")
//@ route POST /api/interview/interview 
//@description Generate interview report on basis of self description and job description, resume pdf
//@access Private
interviewRouter.post("/",authMiddleware.authUser,upload.single('resume'),interviewController.generateInterviewReportController)

//@route GET /api/interview/report/getAllInterviewReports
//@description Get all interview reports for a user
//@access Private
interviewRouter.get("/report/getAllInterviewReports",authMiddleware.authUser,interviewController.getAllInterviewReportsController)

//@route GET /api/interview/report/:interviewId
//@description Get interview report by id
//@access Private
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

//@route POST /api/interview/resume/:interviewId
//@description Generate resume on basis of interview report
//@access Private
interviewRouter.post("/resume/:interviewId",authMiddleware.authUser,interviewController.generateResumeController)
module.exports = interviewRouter;
