const app = require('./src/app')
const {resume, jobDescription, selfDescription} = require('./src/services/sample_resume')
require('dotenv').config()
console.log(process.env.MONGO_URI)
const connectToDB = require('./src/config/database')
const generateInterviewReport = require('./src/services/ai.services')
connectToDB()

generateInterviewReport({resume, jobDescription, selfDescription})

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})