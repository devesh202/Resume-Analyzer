const mongoose = require("mongoose")

/**
 * - job description : string
 * - resume text: string
 * - self description : string 
 * - matchScore : number
 * - Technical Questions : [{
 *       question:""
 *       intention:""
 *       answer:""   
 * }]
 * - Behavioral Questions: [
 *       question:""
 *       intention:""
 *       answer:""   
 * ]
 * - skill Gaps: [
 *        skill:"",
 *        severity:
 *              type:String,
 *              enum: ["low", "medium", "high"]
 * ]
 * - Preparation Plan : [{
 *      day:Number,
 *      focus:String,
 *      tasks:[string],
 *      resources:,
 * 
 * }]
 */


const preparationTaskSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:[true, "day is required"]
    },
    focus:{
        type:String,
        required:[true, "focus is required"]
    },
    tasks:{
        type:[String],
        required:true
    }
},{
    _id:false
})


const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true, "skill is required"]
    },
    severity:{
        type:String,
        enum:["low", "medium", "high"],
        required:[true, "severity is required"]
    },
},{
    _id:false
})
     

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intention:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
},{
    _id:false
})
const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true, "jobDescription is required"]
    },
    resume:{
        type:String,
        
    },
    selfDescription:{
        type:String,
        required:true
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:{
        type:[technicalQuestionSchema],
       
    },
    behavioralQuestions:{
        type:[behavioralQuestionSchema],
        
    },
    skillGaps:{
        type:[skillGapSchema],
        
    },
    preparationPlan:{
        type:[preparationTaskSchema],
       
    }
   
},{timestamps:true }) 

module.exports = mongoose.model("InterviewReport", interviewReportSchema)



