import React from 'react';
import { Brain, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  progress: number;
}

export default function LoadingSpinner({ progress }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      
      <div className="text-center max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Analyzing Your Future
        </h3>
        <p className="text-gray-600 mb-4">
          Our AI is reading your PDF resume and predicting career trends...
        </p>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">{progress}% Complete</p>
      </div>
      
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Zap className="w-4 h-4" />
        <span>Powered by Gemini AI with Vision</span>
      </div>
    </div>
  );
}