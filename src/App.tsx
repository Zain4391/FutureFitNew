import React, { useState } from 'react';
import { Brain, Zap } from 'lucide-react';
import FileUpload from './components/FileUpload';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzeResumePDF } from './services/gemini';
import { AnalysisResult, UploadState } from './types';

function App() {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    isAnalyzing: false,
    progress: 0,
    error: null
  });
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const handleFileSelect = async (file: File) => {
    setUploadState({
      isUploading: true,
      isAnalyzing: false,
      progress: 10,
      error: null
    });

    try {
      // Analyze PDF directly with Gemini AI
      setUploadState(prev => ({ 
        ...prev, 
        isUploading: false,
        isAnalyzing: true,
        progress: 30 
      }));

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 1000);

      const analysisResults = await analyzeResumePDF(file);
      
      clearInterval(progressInterval);
      setUploadState(prev => ({ ...prev, progress: 100 }));
      
      setTimeout(() => {
        setResults(analysisResults);
        setUploadState({
          isUploading: false,
          isAnalyzing: false,
          progress: 0,
          error: null
        });
      }, 500);

    } catch (error) {
      setUploadState({
        isUploading: false,
        isAnalyzing: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  const handleReset = () => {
    setResults(null);
    setUploadState({
      isUploading: false,
      isAnalyzing: false,
      progress: 0,
      error: null
    });
  };

  const isLoading = uploadState.isUploading || uploadState.isAnalyzing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FutureFit
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover when AI might impact your career and get personalized recommendations to stay ahead
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-gray-500">
            <Zap className="w-4 h-4" />
            <span>Powered by Google Gemini AI with Vision</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {results ? (
            <ResultsDisplay results={results} onReset={handleReset} />
          ) : isLoading ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <LoadingSpinner progress={uploadState.progress} />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Upload Your Resume
                </h2>
                <p className="text-gray-600">
                  Our AI will read your PDF resume and provide future-focused insights
                </p>
              </div>
              
              <FileUpload
                onFileSelect={handleFileSelect}
                isUploading={uploadState.isUploading}
                error={uploadState.error}
              />
              
              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Your resume is processed securely and not stored</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500">
          <p>Built with React, TypeScript, and Google Gemini AI with Vision</p>
        </div>
      </div>
    </div>
  );
}

export default App;