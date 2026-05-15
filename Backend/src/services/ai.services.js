const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

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
    })
  ),
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
          },

          required: [
            "matchScore",
            "technicalQuestions",
            "behavioralQuestions",
            "skillGaps",
            "preparationPlan",
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

    console.log(JSON.stringify(validated.data, null, 2));

    return validated.data;

  } catch (error) {
    console.error(
      "Error generating interview report:",
      error
    );
  }
}

module.exports = generateInterviewReport;