import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalysisResult } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = 'YOUR_API_KEY';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzeResumePDF(file: File): Promise<AnalysisResult> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Convert file to base64
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const prompt = `
    You are an AI career advisor specializing in analyzing the future impact of AI on careers. 
    Analyze the resume PDF provided and provide a comprehensive, field-specific assessment based on the person's actual industry and role.

    Please analyze this resume and provide your analysis in this EXACT JSON structure (return ONLY valid JSON, no additional text):
    {
      "aiReplacementTimeline": {
        "yearsUntilReplacement": number (provide exact year, e.g., 8, 12, 15, not ranges like "10+"),
        "riskLevel": "Low" | "Medium" | "High" | "Critical",
        "reasoning": "detailed explanation of why this timeline based on the specific field and role",
        "keyVulnerabilities": ["field-specific vulnerability1", "field-specific vulnerability2", "field-specific vulnerability3"]
      },
      "recommendedCertifications": [
        {
          "name": "field-relevant certification name",
          "provider": "provider name",
          "estimatedDuration": "duration string",
          "relevanceScore": number (1-10),
          "description": "why this certification helps in their specific field/industry",
          "urgency": "Low" | "Medium" | "High"
        }
      ],
      "degreePrograms": [
        {
          "title": "field-relevant degree title",
          "level": "Bachelor" | "Master" | "PhD" | "Certificate",
          "field": "specific field of study relevant to their career",
          "estimatedDuration": "duration string",
          "relevanceScore": number (1-10),
          "description": "how this degree helps future-proof their specific career path"
        }
      ],
      "aiTools": [
        {
          "name": "tool name relevant to their field",
          "category": "category relevant to their industry",
          "description": "what this tool does and how it specifically helps in their field/role",
          "learningCurve": "Easy" | "Medium" | "Hard",
          "impactLevel": number (1-10),
          "url": "optional url if available"
        }
      ],
      "overallRecommendation": "comprehensive summary and action plan tailored to their specific field and career level"
    }

    Requirements:
    - IMPORTANT: Analyze the specific field/industry from the resume (e.g., healthcare, finance, education, marketing, law, etc.)
    - Provide field-specific certifications relevant to their industry (not just tech certifications)
    - Recommend degree programs that make sense for their career path and field
    - Include AI tools that are actually relevant to their specific industry/role
    - For non-tech fields, focus on how AI impacts their specific industry
    - Provide at least 3 field-relevant certifications, 2 relevant degree programs, and 5 industry-specific AI tools
    - Give an exact year for replacement (e.g., 7, 12, 18) not vague ranges
    - Base your timeline on current AI advancement rates in their specific industry
    - Return ONLY valid JSON, no additional text or formatting
  `;

  try {
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: file.type,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response to extract only the JSON part
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from AI');
    }
    
    const jsonResponse = JSON.parse(jsonMatch[0]);
    return jsonResponse as AnalysisResult;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume. Please try again.');
  }
}