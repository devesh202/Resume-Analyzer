const pdfParse = require("pdf-parse")
const mammoth = require("mammoth")
const generateInterviewReport = require("../services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")
async function generateInterviewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body
        if (!jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Job description is required"
            })
        }

        let resumeText = ""
        if (req.file) {
            const mime = req.file.mimetype
            const ext = req.file.originalname?.toLowerCase() || ""
            if (mime === "application/pdf" || ext.endsWith(".pdf")) {
                const resumeContent = await (new pdfParse.PDFParse({ data: new Uint8Array(req.file.buffer) })).getText()
                resumeText = resumeContent.text
            } else if (mime.includes("wordprocessing") || ext.endsWith(".docx")) {
                const result = await mammoth.extractRawText({ buffer: req.file.buffer })
                resumeText = result.value
            } else if (ext.endsWith(".doc")) {
                return res.status(400).json({
                    success: false,
                    message: "Legacy .doc files are not supported. Please convert to .docx or PDF."
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Unsupported file format. Please upload a PDF or DOCX file."
                })
            }
        }

        if (!resumeText && !selfDescription) {
            return res.status(400).json({
                success: false,
                message: "Either a resume file or a self description is required"
            })
        }

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription: selfDescription || "",
            jobDescription
        })

        if (!interviewReportByAi) {
            return res.status(500).json({
                success: false,
                message: "AI failed to generate a valid interview report"
            })
        }

        const interviewReportmodel = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription: selfDescription || "",
            jobDescription,
            ...interviewReportByAi
        })
        res.status(200).json({
            success: true,
            message: "Interview report generated successfully",
            data: interviewReportmodel
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

async function getInterviewReportByIdController(req, res) {
    try {
        const interviewId = req.params.interviewId
        const interviewReport = await interviewReportModel.findById(interviewId)
        if (!interviewReport) {
            return res.status(404).json({
                success: false,
                message: "Interview report not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Interview report fetched successfully",
            data: interviewReport
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
        res.status(200).json({
            success: true,
            message: "Interview reports fetched successfully",
            data: interviewReports
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController }