import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODEL_NAME } from '@/ai-tool/constants';
import ErrorMessage from '@/ai-tool/components/ErrorMessage';
import type { ActiveActionType, InputMethodType } from '@/ai-tool/types';

const AITool: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [activeAction, setActiveAction] = useState<ActiveActionType>(null);
  const [inputMethod, setInputMethod] = useState<InputMethodType>('prompt');

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorContent(value);
    }
  };

  const handleUpdatePresentation = async () => {
    try {
      setError('');
      setActiveAction('update');

      const response = await fetch('/api/ai-tool/update-presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editorContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to update presentation');
      }

      const data = await response.json();
      setEditorContent(data.updatedContent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setActiveAction(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">LaTeX Beamer Editor</h1>
      
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={handleUpdatePresentation}
            disabled={activeAction !== null}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Update Presentation
          </button>
        </div>

        {error && <ErrorMessage message={error} />}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Editor
          height="600px"
          defaultLanguage="latex"
          value={editorContent}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
};

export default AITool; 