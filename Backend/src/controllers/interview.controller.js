const pdfParse = require("pdf-parse")
const generateInterviewReport=require("../services/ai.services")
const interviewReportModel= require("../models/interviewReport.model")
async function generateInterviewReportController(req,res){
    try {
     const resumeContent =await (new pdfParse.PDFParse(new Uint8Array(req.file.buffer))).getText()
     const {selfDescription,jobDescription} = req.body
     const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription
     })

     const interviewReportmodel = await interviewReportModel.create({
        user : req.user.id,
        resume:resumeContent.text,
        selfDescription:selfDescription,
        jobDescription:jobDescription,
        ...interviewReportByAi
     })
     res.status(200).json({
        success:true,
        message:"Interview report generated successfully",
        data:interviewReportmodel
     })

    } catch (error) {
        console.log(error)
        
    }
}

async function getInterviewReportByIdController(req,res){
    const interviewId = req.params.interviewId
    const interviewReport = await interviewReportModel.findById(interviewId)
    res.status(200).json({
        success:true,
        message:"Interview report fetched successfully",
        data:interviewReport
    })
}

async function getAllInterviewReportsController(req,res){
    const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
    res.status(200).json({
        success:true,
        message:"Interview reports fetched successfully",
        data:interviewReports
    })
}
module.exports = {generateInterviewReportController,getInterviewReportByIdController,getAllInterviewReportsController}