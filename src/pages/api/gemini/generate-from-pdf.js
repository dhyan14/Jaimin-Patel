import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_MODEL_NAME = 'gemini-pro-vision';

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
    const { currentLatexCode, pdfData, pdfMimeType, pdfPrompt } = req.body;

    if (!currentLatexCode || !pdfData) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API_KEY_MISSING: The Gemini API key is not configured. Please ensure the GEMINI_API_KEY environment variable is set up.' 
      });
    }

    const ai = new GoogleGenerativeAI({ apiKey });

    const systemPromptForPdf = `You are an expert LaTeX Beamer presentation creator, specializing in incorporating content from PDF documents.
You will be given:
1. An existing LaTeX Beamer presentation code.
2. A PDF document.
3. An optional user prompt related to the PDF content.

Your task is to:
1. Analyze the content of the PDF document.
2. Consider the user's optional prompt for guidance (e.g., "Summarize chapter 2 of this PDF into a new slide," "Create three new frames covering the main topics of this document," "Extract key figures/tables from page 5 and create a frame"). If the prompt is empty, use your best judgment to extract key information or summarize the PDF for presentation slides.
3. Generate new LaTeX Beamer content (e.g., new frames, bullet points, summaries, tables based on PDF content) based on the PDF and the prompt.
4. Integrate this new content seamlessly into the existing LaTeX Beamer code. This usually means adding new \\begin{frame} ... \\end{frame} blocks before the final \\end{document} command.
5. Return the COMPLETE, updated, and compilable LaTeX Beamer code, including the newly generated content.

PRESERVE THE EXISTING PREAMBLE AND DOCUMENT STRUCTURE. Only add to the document body.
Ensure all necessary Beamer document structure elements are correctly maintained. Frame titles should be relevant.
The output MUST be ONLY the raw LaTeX code. Do not include any explanatory text, markdown formatting, or any other content outside the LaTeX document.
If the PDF contains images or complex layouts you cannot directly translate to LaTeX, describe them or extract textual information related to them.
Critically, ensure you return the *entire document content*, from \`\\documentclass\` to \`\\end{document}\`.`;

    const pdfFilePart = {
      inlineData: {
        mimeType: pdfMimeType,
        data: pdfData.split(',')[1], // Remove the data URL prefix
      },
    };

    const textPromptForPdf = `Current LaTeX Code:\n${currentLatexCode}\n\nUser instruction for PDF (optional):\n${pdfPrompt || 'No specific instruction. Analyze the PDF and generate relevant new frames based on its content, integrating it into the current LaTeX code. Provide descriptive frame titles.'}`;
    const textPart = { text: textPromptForPdf };

    const model = ai.getGenerativeModel({ model: GEMINI_MODEL_NAME });
    const result = await model.generateContent({
      contents: [textPart, pdfFilePart],
      generationConfig: {
        temperature: 0.7,
        topK: 32,
        topP: 1,
        maxOutputTokens: 4096,
      },
    });

    const updatedLatexCode = cleanLatexResponse(result.response.text());
    return res.status(200).json({ updatedLatexCode });

  } catch (error) {
    console.error('Error in Gemini API:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to process the request' 
    });
  }
} 