# LaTeX Beamer Editor with AI

An AI-powered LaTeX Beamer presentation editor built with Next.js and Google's Gemini AI.

## Features

- Monaco Editor for LaTeX editing
- AI-powered suggestions and improvements
- Real-time preview
- TypeScript support
- Modern UI with Tailwind CSS

## Deployment on Vercel

1. Fork this repository
2. Connect your fork to Vercel
3. Add the following environment variable in Vercel:
   - `GOOGLE_API_KEY`: Your Google AI API key for Gemini

### Environment Variables

Make sure to add the following environment variable in your Vercel project settings:

- `GOOGLE_API_KEY`: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Project Structure

```
src/
├── ai-tool/
│   ├── components/
│   │   └── ErrorMessage.tsx
│   ├── constants.ts
│   └── types.ts
├── pages/
│   ├── ai-tool/
│   │   └── index.tsx
│   └── api/
│       └── ai-tool/
│           └── update-presentation.ts
└── styles/
    └── globals.css
```

## Tech Stack

- Next.js
- TypeScript
- Monaco Editor
- Google Generative AI (Gemini)
- Tailwind CSS

## License

MIT
