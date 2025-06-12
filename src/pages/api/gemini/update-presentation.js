import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_MODEL_NAME = 'gemini-pro';

const cleanLatexResponse = (rawText) => {
  if (!rawText || rawText.trim() === '') {
    console.warn("Received empty response from AI model.");
    throw new Error("Received empty response from AI model. Please try a different prompt.");
  }
    
  let finalLatexCode = rawText.trim();
  // Regex to remove common markdown code fences (latex, tex, or no language specified)
  const fenceRegex = /^```(?:latex|tex)?\s*\n?(.*?)\n?\s*```$/s;
  const match = finalLatexCode.match(fenceRegex);
  if (match && match[1]) {
    finalLatexCode = match[1].trim();
  }
  return finalLatexCode;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { currentLatexCode, userInstruction } = req.body;

    if (!currentLatexCode || !userInstruction) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API_KEY_MISSING: The Gemini API key is not configured. Please ensure the GEMINI_API_KEY environment variable is set up.' 
      });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: GEMINI_MODEL_NAME });

    const prompt = `You are an expert LaTeX Beamer presentation editor.
You will be given an existing LaTeX Beamer code and a user instruction.
Your task is to modify the given LaTeX code based on the user's instruction and return the COMPLETE, updated, and compilable LaTeX Beamer code.
PRESERVE THE EXISTING PREAMBLE AND DOCUMENT STRUCTURE UNLESS THE USER SPECIFICALLY ASKS TO CHANGE IT.
Ensure all necessary Beamer document structure elements (like \\begin{document}, \\end{document}, \\begin{frame} ... \\end{frame}, frame titles using \\frametitle{}, etc.) are correctly maintained for a compilable document.
The output MUST be ONLY the raw LaTeX code. Do not include any explanatory text, markdown formatting (like \`\`\`latex ... \`\`\` marks), or any other content before \`\\documentclass{beamer}\` or after \`\\end{document}\`.
If the user asks for something that requires a package not currently in the preamble (e.g., specific table formatting, complex diagrams), try to add the necessary package to the preamble if it's a common LaTeX package.
Assume the user wants valid, modern Beamer LaTeX.
Critically, ensure you return the *entire document content*, from \`\\documentclass\` to \`\\end{document}\`. Do not return only the changed snippet or a partial update; the complete, runnable LaTeX document is required.

Existing LaTeX Code:
${currentLatexCode}

User instruction for modification:
${userInstruction}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const updatedLatexCode = cleanLatexResponse(response.text());
    
    return res.status(200).json({ updatedLatexCode });

  } catch (error) {
    console.error('Error in Gemini API:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to process the request' 
    });
  }
} 