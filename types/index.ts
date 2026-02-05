// Existing User type
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Updated Interview type with results fields
export interface Interview {
  id: string;
  userId: string;
  jobRole: string;
  company: string;
  interviewType: 'technical' | 'behavioral' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
  questions: InterviewQuestion[];
  status: 'pending' | 'in-progress' | 'completed';
  score: number | null;
  feedback: string | null;
  overall_feedback?: string | null;
  strengths?: string[];
  improvements?: string[];
  createdAt: Date;
  completedAt?: Date;
}

// Question structure
export interface InterviewQuestion {
  question: string;
  category: string;
  index?: number;
  userAnswer?: string; // Add this for backward compatibility
}

// Individual answer for each question
export interface InterviewAnswer {
  id: string;
  interview_id: string;
  question_index: number;
  question_text: string;
  question_category: string;
  user_answer: string;
  transcript?: string;
  audio_url?: string;
  score: number | null;
  feedback: string | null;
  strengths: string[];
  improvements: string[];
  created_at: Date;
}

// Complete interview result (interview + all answers)
export interface InterviewResult {
  interview: Interview;
  answers: InterviewAnswer[];
}