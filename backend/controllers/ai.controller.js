// controllers/ai.controller.js
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateAIContent = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ message: "type and data are required" });
    }

    let prompt = "";

    switch (type) {

      case "summary":
        prompt = `You are a professional resume writer.
      Enhance this rough resume summary into a polished, ATS-friendly version in 3-4 lines:
        
      Raw Input: "${data.rawSummary}"
        
      Rules:
      - Keep the same meaning but make it professional
      - Start with a strong opening
      - ATS friendly keywords
      - Return only the enhanced summary, no explanation`;
      break;

      case "project":
        prompt = `You are a professional resume writer.
        Write a 2-3 line project description for a resume based on just the project title:
        Project Title: "${data.title}"
        Rules:
        - Write what this project likely does based on the title
        - Result oriented and professional
        - Mention likely tech stack based on project type
        - Return only the description text, no explanation`;
        break;

      case "experience":
        prompt = `You are a professional resume writer.
        Write 2-3 lines of work experience description for a resume based on just the role:
        Role: "${data.role}"
        Rules:
        - Write what this role typically involves
        - Use strong action verbs
        - Be concise and measurable
        - Return only the description text, no explanation`;
        break;

      // case "skills":
      //   prompt = `Suggest 8-10 relevant technical skills for this job title:
      //     Job Title: ${data.jobTitle}
      //     Rules:
      //     - Return as comma separated list only
      //     - No explanation, no numbering, no extra text
      //     Example format: JavaScript, React, Node.js, MongoDB`;
      //   break;

      default:
        return res.status(400).json({ message: "Invalid type. Use: summary | project | experience | skills" });
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    const result = response.choices[0].message.content.trim();
    res.status(200).json(result);

  } catch (error) {
    console.error("Groq AI error:", error);
    res.status(500).json({
      message: "AI generation failed",
      error: error.message,
    });
  }
};

module.exports = { generateAIContent };