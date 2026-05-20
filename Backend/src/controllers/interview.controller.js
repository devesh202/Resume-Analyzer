const pdfParse = require("pdf-parse")
const generateInterviewReport=require("../services/ai.services")
const interviewReportModel= require("../models/interviewReport.model")
async function generateInterviewReportController(req,res){
    try {
     const resumeContent =await (new pdfParse.PDFParse(Uint8Array(req.file.buffer))).getText()
     const {selfDescription,jobDescription} = req.body
     const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent,
        selfDescription,
        jobDescription
     })

     const interviewReportModel = await interviewReportModel.create({
        user : req.user.id,
        resume:resumeContent.text,
        selfDescription:selfDescription,
        jobDescription:jobDescription,
        ...interviewReportByAi
     })
     res.status(200).json({
        success:true,
        message:"Interview report generated successfully",
        data:interviewReportModel
     })

    } catch (error) {
        console.log(error)
        
    }
}
module.exports = {generateInterviewReportController}