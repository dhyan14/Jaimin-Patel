import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const initialLatexCode = `\\documentclass[aspectratio=169]{beamer}
\\usetheme{Warsaw}

\\definecolor{MyCyan}{RGB}{15, 130, 148}
\\usecolortheme[named = MyCyan]{structure}

\\usepackage{amsmath, amssymb}
\\usepackage{graphicx}

\\title{My Presentation}
\\author{Created with AI Assistant}
\\date{\\today}

\\begin{document}

\\begin{frame}
  \\titlepage
\\end{frame}

% Add content below based on prompts

\\end{document}`;

export default function LatexEditor() {
  const [latexCode, setLatexCode] = useState(initialLatexCode);
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const handleUpdatePresentation = async () => {
    if (!userPrompt.trim()) {
      toast.error('Please enter a prompt to update the presentation.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/update-presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentLatexCode: latexCode,
          userInstruction: userPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update presentation');
      }

      const data = await response.json();
      setLatexCode(data.updatedLatexCode);
      setUserPrompt('');
      toast.success('Presentation updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to update presentation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    // Add LaTeX language support if needed
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      lineNumbers: 'on',
      wordWrap: 'on',
      wrappingIndent: 'same',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>AI-Powered LaTeX Beamer Editor</title>
        <meta name="description" content="Create and edit LaTeX Beamer presentations with AI assistance" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            AI-Powered LaTeX Beamer Editor
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor Section */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px]">
                <MonacoEditor
                  height="100%"
                  language="latex"
                  theme="vs-light"
                  value={latexCode}
                  onChange={setLatexCode}
                  onMount={handleEditorDidMount}
                  options={{
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>

            {/* Controls Section */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">AI Assistant</h2>
                <div className="space-y-4">
                  <textarea
                    className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe what changes you want to make to the presentation..."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                  <button
                    className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    onClick={handleUpdatePresentation}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Updating...' : 'Update Presentation'}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Type or paste your LaTeX code in the editor</li>
                  <li>Use the prompt box to describe changes you want to make</li>
                  <li>Click "Update Presentation" to apply AI-powered changes</li>
                  <li>The AI will help modify your presentation while maintaining valid LaTeX syntax</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 