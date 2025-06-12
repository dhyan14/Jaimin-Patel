import { useState, useCallback } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const initialLatexCode = `\\documentclass[aspectratio=169]{beamer}
\\usetheme{Warsaw}

\\definecolor{MyCyan}{RGB}{15, 130, 148}
\\definecolor{MyGreen}{rgb}{.125,.5,.25}
\\definecolor{MyRed}{RGB}{156, 3, 17}
\\usecolortheme[named = MyCyan]{structure}

\\usepackage{amsmath, amssymb}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{fancyhdr}
\\usepackage{hyperref}
\\usepackage{amsthm}
\\usepackage{tcolorbox}
\\usepackage{xcolor}
\\usepackage{gensymb}
\\usepackage{tikz}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.17}
\\usepackage{multicol}
\\usepackage{array}

\\title{My Presentation}
\\author{AI Assistant}
\\date{\\today}

\\begin{document}

\\begin{frame}
  \\titlepage
\\end{frame}

% Add content below based on prompts

\\end{document}`;

// Input method types
const INPUT_METHODS = {
  PROMPT: 'prompt',
  IMAGE: 'image',
  PDF: 'pdf'
};

// Action types
const ACTIONS = {
  UPDATE: 'update',
  MODIFY: 'modify',
  GENERATE_IMAGE: 'generateImage',
  GENERATE_PDF: 'generatePdf'
};

export default function LatexEditor() {
  const [latexCode, setLatexCode] = useState(initialLatexCode);
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeAction, setActiveAction] = useState(null);
  const [selectedInputMethod, setSelectedInputMethod] = useState(INPUT_METHODS.PROMPT);
  
  const [selectedText, setSelectedText] = useState(null);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);

  const [pastedImage, setPastedImage] = useState(null);
  const [imageMimeType, setImageMimeType] = useState(null);
  const [imagePrompt, setImagePrompt] = useState('');

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfMimeType, setPdfMimeType] = useState(null);
  const [pdfPrompt, setPdfPrompt] = useState('');
  const [pdfFileName, setPdfFileName] = useState(null);

  const handleLatexCodeChange = (newCode) => {
    setLatexCode(newCode);
  };

  const handleSelectionChange = useCallback((editor) => {
    const selection = editor.getSelection();
    const selectedText = editor.getModel().getValueInRange(selection);
    if (selectedText) {
      setSelectedText(selectedText);
      setSelectionStart(selection.startLineNumber);
      setSelectionEnd(selection.endLineNumber);
    }
  }, []);

  const clearSelection = () => {
    setSelectedText(null);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const handleImageUpload = useCallback((file) => {
    if (!file.type.startsWith('image/')) {
      setError('Invalid file type. Please select an image.');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPastedImage(reader.result);
      setImageMimeType(file.type);
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  }, []);

  const handlePdfUpload = useCallback((file) => {
    if (file.type !== 'application/pdf') {
      setError('Invalid file type. Please select a PDF file.');
      return;
    }
    setError(null);
    setPdfFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedPdf(reader.result);
      setPdfMimeType(file.type);
    };
    reader.onerror = () => {
      setError('Failed to read PDF file.');
    };
    reader.readAsDataURL(file);
  }, []);

  const handleUpdatePresentation = async () => {
    if (!userPrompt.trim()) {
      toast.error('Please enter a prompt to update the presentation.');
      return;
    }

    setActiveAction(ACTIONS.UPDATE);
    setIsLoading(true);
    setError(null);
    clearSelection();

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
        const error = await response.json();
        throw new Error(error.error || 'Failed to update presentation');
      }

      const data = await response.json();
      setLatexCode(data.updatedLatexCode);
      setUserPrompt('');
      toast.success('Presentation updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  const handleImageGeneration = async () => {
    if (!pastedImage) {
      toast.error('Please upload an image first.');
      return;
    }

    setActiveAction(ACTIONS.GENERATE_IMAGE);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini/generate-from-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentLatexCode: latexCode,
          imageData: pastedImage,
          imageMimeType: imageMimeType,
          imagePrompt: imagePrompt,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate from image');
      }

      const data = await response.json();
      setLatexCode(data.updatedLatexCode);
      setImagePrompt('');
      setPastedImage(null);
      setImageMimeType(null);
      toast.success('Generated content from image successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  const handlePdfGeneration = async () => {
    if (!selectedPdf) {
      toast.error('Please upload a PDF file first.');
      return;
    }

    setActiveAction(ACTIONS.GENERATE_PDF);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gemini/generate-from-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentLatexCode: latexCode,
          pdfData: selectedPdf,
          pdfMimeType: pdfMimeType,
          pdfPrompt: pdfPrompt,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate from PDF');
      }

      const data = await response.json();
      setLatexCode(data.updatedLatexCode);
      setPdfPrompt('');
      setSelectedPdf(null);
      setPdfMimeType(null);
      setPdfFileName(null);
      toast.success('Generated content from PDF successfully!');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
      setActiveAction(null);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editor.updateOptions({
      fontSize: 14,
      minimap: { enabled: false },
      lineNumbers: 'on',
      wordWrap: 'on',
      wrappingIndent: 'same',
    });

    editor.onDidChangeCursorSelection(() => {
      handleSelectionChange(editor);
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
                  onChange={handleLatexCodeChange}
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
              {/* Input Method Selector */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Input Method</h2>
                <div className="flex space-x-4">
                  {Object.values(INPUT_METHODS).map((method) => (
                    <button
                      key={method}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedInputMethod === method
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => setSelectedInputMethod(method)}
                    >
                      {method.charAt(0).toUpperCase() + method.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedInputMethod === INPUT_METHODS.PROMPT
                    ? 'AI Assistant'
                    : selectedInputMethod === INPUT_METHODS.IMAGE
                    ? 'Image Input'
                    : 'PDF Input'}
                </h2>

                {selectedInputMethod === INPUT_METHODS.PROMPT && (
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
                )}

                {selectedInputMethod === INPUT_METHODS.IMAGE && (
                  <div className="space-y-4">
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        pastedImage ? 'border-green-500' : 'border-gray-300'
                      }`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) handleImageUpload(file);
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) handleImageUpload(file);
                        }}
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer text-blue-600 hover:text-blue-700"
                      >
                        {pastedImage ? (
                          <img
                            src={pastedImage}
                            alt="Uploaded"
                            className="max-h-32 mx-auto"
                          />
                        ) : (
                          'Click to upload or drag and drop an image'
                        )}
                      </label>
                    </div>
                    <textarea
                      className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Optional: Provide instructions for processing the image..."
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                    />
                    <button
                      className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                        isLoading || !pastedImage
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      onClick={handleImageGeneration}
                      disabled={isLoading || !pastedImage}
                    >
                      {isLoading ? 'Generating...' : 'Generate from Image'}
                    </button>
                  </div>
                )}

                {selectedInputMethod === INPUT_METHODS.PDF && (
                  <div className="space-y-4">
                    <div
                      className={`border-2 border-dashed rounded-lg p-4 text-center ${
                        selectedPdf ? 'border-green-500' : 'border-gray-300'
                      }`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) handlePdfUpload(file);
                      }}
                    >
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) handlePdfUpload(file);
                        }}
                        id="pdf-upload"
                      />
                      <label
                        htmlFor="pdf-upload"
                        className="cursor-pointer text-blue-600 hover:text-blue-700"
                      >
                        {selectedPdf ? (
                          <div className="flex items-center justify-center space-x-2">
                            <svg
                              className="w-8 h-8 text-red-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            <span>{pdfFileName}</span>
                          </div>
                        ) : (
                          'Click to upload or drag and drop a PDF'
                        )}
                      </label>
                    </div>
                    <textarea
                      className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Optional: Provide instructions for processing the PDF..."
                      value={pdfPrompt}
                      onChange={(e) => setPdfPrompt(e.target.value)}
                    />
                    <button
                      className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                        isLoading || !selectedPdf
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                      onClick={handlePdfGeneration}
                      disabled={isLoading || !selectedPdf}
                    >
                      {isLoading ? 'Generating...' : 'Generate from PDF'}
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Type or paste your LaTeX code in the editor</li>
                  <li>Choose your preferred input method: text prompt, image, or PDF</li>
                  <li>For text prompts: Describe the changes you want to make</li>
                  <li>For images: Upload an image and optionally provide instructions</li>
                  <li>For PDFs: Upload a PDF and optionally provide instructions</li>
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