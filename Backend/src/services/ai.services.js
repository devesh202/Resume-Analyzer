const { GoogleGenAI } = require("@google/genai");
const puppeteer = require("puppeteer");
const { z } = require("zod");
const { ZodSchema } = require("zod/v3");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
  title: z.string().describe("Title of the job for which the interview is being conducted"),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const prompt = `
You are an expert AI Interviewer.

Generate a detailed interview report.

IMPORTANT RULES:
- Return ONLY valid JSON
- No markdown
- Follow schema exactly
- Do not omit fields
- preparationPlan days must be unique
- preparationPlan days must be sequential
- Do not repeat questions

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "OBJECT",

          properties: {
            matchScore: {
              type: "NUMBER",
            },

            technicalQuestions: {
              type: "ARRAY",

              items: {
                type: "OBJECT",

                properties: {
                  question: {
                    type: "STRING",
                  },

                  intention: {
                    type: "STRING",
                  },

                  answer: {
                    type: "STRING",
                  },
                },

                required: [
                  "question",
                  "intention",
                  "answer",
                ],
              },
            },

            behavioralQuestions: {
              type: "ARRAY",

              items: {
                type: "OBJECT",

                properties: {
                  question: {
                    type: "STRING",
                  },

                  intention: {
                    type: "STRING",
                  },

                  answer: {
                    type: "STRING",
                  },
                },

                required: [
                  "question",
                  "intention",
                  "answer",
                ],
              },
            },

            skillGaps: {
              type: "ARRAY",

              items: {
                type: "OBJECT",

                properties: {
                  skill: {
                    type: "STRING",
                  },

                  severity: {
                    type: "STRING",

                    enum: [
                      "low",
                      "medium",
                      "high",
                    ],
                  },
                },

                required: [
                  "skill",
                  "severity",
                ],
              },
            },

            preparationPlan: {
              type: "ARRAY",

              items: {
                type: "OBJECT",

                properties: {
                  day: {
                    type: "NUMBER",
                  },

                  focus: {
                    type: "STRING",
                  },

                  tasks: {
                    type: "ARRAY",

                    items: {
                      type: "STRING",
                    },
                  },
                },

                required: [
                  "day",
                  "focus",
                  "tasks",
                ],
              },
            },

            title: {
              type: "STRING",
              description: "Title of the job for which the interview is being conducted",
            },
          },

          required: [
            "matchScore",
            "technicalQuestions",
            "behavioralQuestions",
            "skillGaps",
            "preparationPlan",
            "title",
          ],
        },
      },
    });

    const text =
      typeof response.text === "function"
        ? response.text()
        : response.text;

    const parsed = JSON.parse(text);

    const validated =
      interviewReportSchema.safeParse(parsed);

    if (!validated.success) {
      console.log(validated.error.format());
      return null;
    }


    return validated.data;

  } catch (error) {
    console.error(
      "Error generating interview report:",
      error
    );
    return null;
  }
}

async function generatePdfBuffer({ htmlContent }) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
}
  

async function generateResumePdf({ resume,jobDescription,selfDescription }) {
  const resumePdfSchema = z.object({
    html: z.string().describe("The Html content of the resume which can be converted to pdf using any library like puppeteer ")
  });

  let response;
  try {
    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `;

    response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            html: {
              type: "STRING",
              description: "The Html content of the resume which can be converted to pdf using any library like puppeteer"
            }
          },
          required: ["html"]
        }
      },
    });
  } catch (error) {
    console.error(
      "Error generating resume...",
      error
    );
    return null;
  }

  if (!response) return null;

  try {
    const text =
      typeof response.text === "function"
        ? response.text()
        : response.text;

    const jsonContent = JSON.parse(text);
    const validated = resumePdfSchema.safeParse(jsonContent);

    if (!validated.success) {
      console.error("Resume PDF validation failed:", validated.error.format());
      return null;
    }

    const pdfBuffer = await generatePdfBuffer({ htmlContent: validated.data.html });
    return pdfBuffer;
  } catch (error) {
    console.error("Error parsing resume JSON or generating PDF:", error);
    return null;
  }
}

module.exports = { generateInterviewReport, generateResumePdf };