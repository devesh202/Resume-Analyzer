const express = require("express")
const interviewRouter = express.Router();
const interviewController = require("../controllers/interview.controller")
const { upload } = require("../middlewares/file.middleware")

const authMiddleware = require("../middlewares/auth.middleware")
interviewRouter.post("/",authMiddleware.authUser,upload.single('resume'),interviewController.generateInterviewReportController)

interviewRouter.get("/report/getAllInterviewReports",authMiddleware.authUser,interviewController.getAllInterviewReportsController)
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)
interviewRouter.post("/resume/:interviewId",authMiddleware.authUser,interviewController.generateResumeController)
module.exports = interviewRouter;