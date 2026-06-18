const generateInterviewReport = require("./src/services/ai.services");
require("dotenv").config();

async function test() {
    console.log("Testing with GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "exists" : "missing");
    try {
        const result = await generateInterviewReport({
            resume: "Frontend developer, React, Javascript, HTML, CSS",
            selfDescription: "I have 3 years of experience in React frontend development.",
            jobDescription: "Required: Frontend Engineer with React experience."
        });
        if (result) {
            console.log("✅ SUCCESS! AI returned a valid report.");
            console.log("Title:", result.title);
            console.log("Match Score:", result.matchScore);
            console.log("Technical Questions count:", result.technicalQuestions?.length);
        } else {
            console.log("❌ Result is null - Zod validation failed or AI returned empty.");
        }
    } catch (err) {
        console.error("❌ Error occurred:", err.message);
    }
}

test();
