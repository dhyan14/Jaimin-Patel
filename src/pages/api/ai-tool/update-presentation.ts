import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODEL_NAME } from '@/ai-tool/constants';

if (!process.env.GOOGLE_API_KEY) {
  throw new Error('Missing GOOGLE_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

    const prompt = `You are a LaTeX expert. Please help improve the following LaTeX Beamer presentation code. Make it more professional, add better transitions, and enhance the visual appeal while maintaining the core content:

${content}

Please provide the complete, improved LaTeX code.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const updatedContent = response.text();

    res.status(200).json({ updatedContent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
} 