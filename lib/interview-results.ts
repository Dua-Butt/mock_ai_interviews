import { supabase } from './supabase';
import { InterviewAnswer, Interview, InterviewResult } from '@/types';

/**
 * Save a single answer during the interview
 */
export async function saveInterviewAnswer(
  interviewId: string,
  questionIndex: number,
  questionText: string,
  questionCategory: string,
  userAnswer: string,
  transcript?: string
): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase
      .from('interview_answers')
      .upsert({
        interview_id: interviewId,
        question_index: questionIndex,
        question_text: questionText,
        question_category: questionCategory,
        user_answer: userAnswer,
        transcript: transcript || userAnswer,
        score: null,
        feedback: null,
        strengths: [],
        improvements: [],
      }, {
        onConflict: 'interview_id,question_index'
      });

    if (error) throw error;
    console.log(`✅ Saved answer for question ${questionIndex}`);
  } catch (error) {
    console.error('Error saving interview answer:', error);
    throw error;
  }
}

/**
 * Evaluate a single answer using Grok API
 */
export async function evaluateAnswer(
  question: string,
  category: string,
  answer: string,
  jobRole: string,
  difficulty: string
): Promise<{
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}> {
  try {
    const response = await fetch('/api/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        category,
        answer,
        jobRole,
        difficulty,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to evaluate answer');
    }

    const evaluation = await response.json();
    console.log(`✅ Evaluated answer: ${evaluation.score}/100`);
    return evaluation;
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return {
      score: 50,
      feedback: 'Unable to evaluate answer at this time. Your response has been recorded.',
      strengths: ['Answer provided'],
      improvements: ['Could not generate specific feedback'],
    };
  }
}

/**
 * Update answer with evaluation results
 */
export async function updateAnswerEvaluation(
  interviewId: string,
  questionIndex: number,
  evaluation: {
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  }
): Promise<void> {
  if (!supabase) throw new Error('Supabase client not initialized');

  try {
    const { error } = await supabase
      .from('interview_answers')
      .update({
        score: evaluation.score,
        feedback: evaluation.feedback,
        strengths: evaluation.strengths,
        improvements: evaluation.improvements,
      })
      .eq('interview_id', interviewId)
      .eq('question_index', questionIndex);

    if (error) throw error;
    console.log(`✅ Updated evaluation for question ${questionIndex}`);
  } catch (error) {
    console.error('Error updating answer evaluation:', error);
    throw error;
  }
}

/**
 * Complete the interview and calculate final results
 */
export async function completeInterview(interviewId: string): Promise<void> {
  if (!supabase) throw new Error('Supabase client not initialized');

  try {
    console.log('📊 Completing interview and calculating results...');

    // Get all answers for this interview
    const { data: answers, error: answersError } = await supabase
      .from('interview_answers')
      .select('*')
      .eq('interview_id', interviewId);

    if (answersError) throw answersError;

    // Calculate overall score
    const scores = answers?.filter(a => a.score !== null).map(a => a.score) || [];
    const overallScore = scores.length > 0
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      : null;

    // Collect all strengths and improvements
    const allStrengths = answers?.flatMap(a => a.strengths || []) || [];
    const allImprovements = answers?.flatMap(a => a.improvements || []) || [];

    // Get unique strengths and improvements
    const uniqueStrengths = [...new Set(allStrengths)].slice(0, 5);
    const uniqueImprovements = [...new Set(allImprovements)].slice(0, 5);

    // Generate overall feedback
    const overallFeedback = generateOverallFeedback(overallScore, answers?.length || 0);

    // Update interview with results
    const { error: updateError } = await supabase
      .from('interviews')
      .update({
        status: 'completed',
        score: overallScore,
        completed_at: new Date().toISOString(),
        overall_feedback: overallFeedback,
        strengths: uniqueStrengths,
        improvements: uniqueImprovements,
      })
      .eq('id', interviewId);

    if (updateError) throw updateError;

    console.log(`✅ Interview completed! Overall score: ${overallScore}/100`);
  } catch (error) {
    console.error('Error completing interview:', error);
    throw error;
  }
}

/**
 * Get complete interview results with all answers
 */
export async function getInterviewResults(interviewId: string): Promise<InterviewResult | null> {
  if (!supabase) throw new Error('Supabase client not initialized');

  try {
    // Get interview details
    const { data: interview, error: interviewError } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .single();

    if (interviewError) throw interviewError;
    if (!interview) return null;

    // Get all answers
    const { data: answers, error: answersError } = await supabase
      .from('interview_answers')
      .select('*')
      .eq('interview_id', interviewId)
      .order('question_index', { ascending: true });

    if (answersError) throw answersError;

    // Format the result
    const formattedInterview: Interview = {
      id: interview.id,
      userId: interview.user_id,
      jobRole: interview.job_role,
      company: interview.company,
      interviewType: interview.interview_type,
      difficulty: interview.difficulty,
      questions: interview.questions,
      status: interview.status,
      score: interview.score,
      feedback: interview.feedback,
      overall_feedback: interview.overall_feedback,
      strengths: interview.strengths || [],
      improvements: interview.improvements || [],
      createdAt: new Date(interview.created_at),
      completedAt: interview.completed_at ? new Date(interview.completed_at) : undefined,
    };

    const formattedAnswers: InterviewAnswer[] = (answers || []).map(answer => ({
      id: answer.id,
      interview_id: answer.interview_id,
      question_index: answer.question_index,
      question_text: answer.question_text,
      question_category: answer.question_category,
      user_answer: answer.user_answer,
      transcript: answer.transcript,
      audio_url: answer.audio_url,
      score: answer.score,
      feedback: answer.feedback,
      strengths: answer.strengths || [],
      improvements: answer.improvements || [],
      created_at: new Date(answer.created_at),
    }));

    return {
      interview: formattedInterview,
      answers: formattedAnswers,
    };
  } catch (error) {
    console.error('Error getting interview results:', error);
    return null;
  }
}

/**
 * Generate overall feedback based on score
 */
function generateOverallFeedback(score: number | null, totalQuestions: number): string {
  if (score === null) {
    return `Interview completed with ${totalQuestions} questions answered. Evaluation pending.`;
  }

  if (score >= 80) {
    return `Excellent performance! You demonstrated strong knowledge and communication skills across all ${totalQuestions} questions. You're well-prepared for this role.`;
  } else if (score >= 60) {
    return `Good performance! You showed solid understanding in most areas. Review the feedback for each question to identify opportunities for improvement.`;
  } else if (score >= 40) {
    return `Fair performance. You have a foundation to build on, but there are several areas that need strengthening. Focus on the improvement suggestions provided.`;
  } else {
    return `This interview revealed areas that need significant improvement. Carefully review the feedback for each question and practice more before your actual interview.`;
  }
}