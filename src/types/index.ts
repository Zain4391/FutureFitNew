export interface AnalysisResult {
  aiReplacementTimeline: {
    yearsUntilReplacement: number;
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    reasoning: string;
    keyVulnerabilities: string[];
  };
  recommendedCertifications: {
    name: string;
    provider: string;
    estimatedDuration: string;
    relevanceScore: number;
    description: string;
    urgency: 'Low' | 'Medium' | 'High';
  }[];
  degreePrograms: {
    title: string;
    level: 'Bachelor' | 'Master' | 'PhD' | 'Certificate';
    field: string;
    estimatedDuration: string;
    relevanceScore: number;
    description: string;
  }[];
  aiTools: {
    name: string;
    category: string;
    description: string;
    learningCurve: 'Easy' | 'Medium' | 'Hard';
    impactLevel: number;
    url?: string;
  }[];
  overallRecommendation: string;
}

export interface UploadState {
  isUploading: boolean;
  isAnalyzing: boolean;
  progress: number;
  error: string | null;
}