const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

async function invokeGeminiAI(){
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:"hello gemini Explain what is interview?",
    })
    console.log(response.text)
    
}

module.exports = invokeGeminiAI