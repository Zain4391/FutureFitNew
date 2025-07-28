import React from 'react';
import { AnalysisResult } from '../types';
import { 
  Clock, 
  AlertTriangle, 
  Award, 
  GraduationCap, 
  Wrench, 
  TrendingUp,
  ExternalLink,
  Star
} from 'lucide-react';

interface ResultsDisplayProps {
  results: AnalysisResult;
  onReset: () => void;
}

export default function ResultsDisplay({ results, onReset }: ResultsDisplayProps) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your FutureFit Analysis</h2>
        <p className="text-gray-600">AI-powered insights for your career future</p>
      </div>

      {/* AI Replacement Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">AI Replacement Timeline</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl font-bold text-blue-600">
                {results.aiReplacementTimeline.yearsUntilReplacement}+ years
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(results.aiReplacementTimeline.riskLevel)}`}>
                {results.aiReplacementTimeline.riskLevel} Risk
              </span>
            </div>
            <p className="text-gray-600 mb-4">{results.aiReplacementTimeline.reasoning}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Key Vulnerabilities
            </h4>
            <ul className="space-y-2">
              {results.aiReplacementTimeline.keyVulnerabilities.map((vulnerability, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{vulnerability}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommended Certifications */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Award className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold text-gray-800">Recommended Certifications</h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.recommendedCertifications.map((cert, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-800 flex-1">{cert.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(cert.urgency)}`}>
                  {cert.urgency}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{cert.provider}</p>
              <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{cert.estimatedDuration}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-600">{cert.relevanceScore}/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Degree Programs */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <GraduationCap className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold text-gray-800">Degree Programs</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {results.degreePrograms.map((degree, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-800">{degree.title}</h4>
                  <p className="text-sm text-gray-500">{degree.level} in {degree.field}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">{degree.relevanceScore}/10</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{degree.description}</p>
              <p className="text-sm text-gray-500">{degree.estimatedDuration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tools */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Wrench className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl font-semibold text-gray-800">AI Tools to Master</h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.aiTools.map((tool, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-800">{tool.name}</h4>
                {tool.url && (
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <p className="text-sm text-purple-600 mb-2">{tool.category}</p>
              <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{tool.learningCurve} to learn</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">{tool.impactLevel}/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overall Recommendation */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Overall Recommendation</h3>
        <p className="text-gray-700 leading-relaxed">{results.overallRecommendation}</p>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Analyze Another Resume
        </button>
      </div>
    </div>
  );
}