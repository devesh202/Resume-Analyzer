const app = require('./src/app')
require('dotenv').config()
console.log(process.env.MONGO_URI)
const connectToDB = require('./src/config/database')
const invokeGeminiAI = require('./src/services/ai.services')
connectToDB()   

invokeGeminiAI()
app.listen(3000,()=>{
    console.log("Server running on port 3000")
})