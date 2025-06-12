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
    const { currentLatexCode, imageData, imageMimeType, imagePrompt } = req.body;

    if (!currentLatexCode || !imageData) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'API_KEY_MISSING: The Gemini API key is not configured. Please ensure the GEMINI_API_KEY environment variable is set up.' 
      });
    }

    const ai = new GoogleGenerativeAI({ apiKey });

    const systemPromptForImage = `You are an expert LaTeX Beamer presentation creator, specializing in integrating visual information into presentations.
You will be given:
1. An existing LaTeX Beamer presentation code.
2. An image.
3. An optional user prompt related to the image.

Your task is to:
1. Analyze the image.
2. Consider the user's optional prompt for guidance (e.g., "Describe this diagram," "Create a slide explaining this chart," "What are the key elements in this photo?"). If the prompt is empty, use your best judgment to create relevant content from the image.
3. Generate new LaTeX Beamer content (typically a new frame, or content within an existing structure if explicitly requested and makes sense) based on the image and the prompt. This might involve describing the image, creating a list of observations, or generating LaTeX code related to the image.
4. Integrate this new content seamlessly into the existing LaTeX Beamer code. Usually, this means adding a new \\begin{frame} ... \\end{frame} block before the final \\end{document} command, or as specified by the user. If the user asks to "replace a placeholder" or "add image to current frame", try to do that.
5. Return the COMPLETE, updated, and compilable LaTeX Beamer code, including the newly generated content.

PRESERVE THE EXISTING PREAMBLE AND DOCUMENT STRUCTURE. Only add to the document body or modify as per instruction.
Ensure all necessary Beamer document structure elements are correctly maintained.
The output MUST be ONLY the raw LaTeX code. Do not include any explanatory text, markdown formatting, or any other content outside the LaTeX document.
When including an image, use a placeholder like "\\includegraphics[width=0.8\\textwidth]{placeholder_image.png}" or similar. The user will replace 'placeholder_image.png' with the actual filename. Create a \`\\frametitle\` that is relevant to the image or the user's prompt.
If the image appears to be a graph or diagram, describe its key features or data points. If it's a photo, describe the scene or main subjects.
Critically, ensure you return the *entire document content*, from \`\\documentclass\` to \`\\end{document}\`.`;

    const imagePart = {
      inlineData: {
        mimeType: imageMimeType,
        data: imageData.split(',')[1], // Remove the data URL prefix
      },
    };

    const textPromptForImage = `Current LaTeX Code:\n${currentLatexCode}\n\nUser instruction for image (optional):\n${imagePrompt || 'No specific instruction. Analyze the image and generate a relevant new frame based on it, integrating it into the current LaTeX code. Provide a descriptive frame title.'}`;
    const textPart = { text: textPromptForImage };

    const model = ai.getGenerativeModel({ model: GEMINI_MODEL_NAME });
    const result = await model.generateContent({
      contents: [textPart, imagePart],
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