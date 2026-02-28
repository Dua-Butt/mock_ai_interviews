// // // // // // // import { supabase } from './supabase';
// // // // // // // import { InterviewAnswer, Interview, InterviewResult } from '@/types';

// // // // // // // /**
// // // // // // //  * Save a single answer during the interview
// // // // // // //  */
// // // // // // // export async function saveInterviewAnswer(
// // // // // // //   interviewId: string,
// // // // // // //   questionIndex: number,
// // // // // // //   questionText: string,
// // // // // // //   questionCategory: string,
// // // // // // //   userAnswer: string,
// // // // // // //   transcript?: string
// // // // // // // ): Promise<void> {
// // // // // // //   if (!supabase) {
// // // // // // //     throw new Error('Supabase client not initialized');
// // // // // // //   }

// // // // // // //   try {
// // // // // // //     const { error } = await supabase
// // // // // // //       .from('interview_answers')
// // // // // // //       .upsert({
// // // // // // //         interview_id: interviewId,
// // // // // // //         question_index: questionIndex,
// // // // // // //         question_text: questionText,
// // // // // // //         question_category: questionCategory,
// // // // // // //         user_answer: userAnswer,
// // // // // // //         transcript: transcript || userAnswer,
// // // // // // //         score: null,
// // // // // // //         feedback: null,
// // // // // // //         strengths: [],
// // // // // // //         improvements: [],
// // // // // // //       }, {
// // // // // // //         onConflict: 'interview_id,question_index'
// // // // // // //       });

// // // // // // //     if (error) throw error;
// // // // // // //     console.log(`✅ Saved answer for question ${questionIndex}`);
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error saving interview answer:', error);
// // // // // // //     throw error;
// // // // // // //   }
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Evaluate a single answer using Grok API
// // // // // // //  */
// // // // // // // export async function evaluateAnswer(
// // // // // // //   question: string,
// // // // // // //   category: string,
// // // // // // //   answer: string,
// // // // // // //   jobRole: string,
// // // // // // //   difficulty: string
// // // // // // // ): Promise<{
// // // // // // //   score: number;
// // // // // // //   feedback: string;
// // // // // // //   strengths: string[];
// // // // // // //   improvements: string[];
// // // // // // // }> {
// // // // // // //   try {
// // // // // // //     const response = await fetch('/api/evaluate-answer', {
// // // // // // //       method: 'POST',
// // // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // // //       body: JSON.stringify({
// // // // // // //         question,
// // // // // // //         category,
// // // // // // //         answer,
// // // // // // //         jobRole,
// // // // // // //         difficulty,
// // // // // // //       }),
// // // // // // //     });

// // // // // // //     if (!response.ok) {
// // // // // // //       throw new Error('Failed to evaluate answer');
// // // // // // //     }

// // // // // // //     const evaluation = await response.json();
// // // // // // //     console.log(`✅ Evaluated answer: ${evaluation.score}/100`);
// // // // // // //     return evaluation;
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error evaluating answer:', error);
// // // // // // //     return {
// // // // // // //       score: 50,
// // // // // // //       feedback: 'Unable to evaluate answer at this time. Your response has been recorded.',
// // // // // // //       strengths: ['Answer provided'],
// // // // // // //       improvements: ['Could not generate specific feedback'],
// // // // // // //     };
// // // // // // //   }
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Update answer with evaluation results
// // // // // // //  */
// // // // // // // export async function updateAnswerEvaluation(
// // // // // // //   interviewId: string,
// // // // // // //   questionIndex: number,
// // // // // // //   evaluation: {
// // // // // // //     score: number;
// // // // // // //     feedback: string;
// // // // // // //     strengths: string[];
// // // // // // //     improvements: string[];
// // // // // // //   }
// // // // // // // ): Promise<void> {
// // // // // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // // // // //   try {
// // // // // // //     const { error } = await supabase
// // // // // // //       .from('interview_answers')
// // // // // // //       .update({
// // // // // // //         score: evaluation.score,
// // // // // // //         feedback: evaluation.feedback,
// // // // // // //         strengths: evaluation.strengths,
// // // // // // //         improvements: evaluation.improvements,
// // // // // // //       })
// // // // // // //       .eq('interview_id', interviewId)
// // // // // // //       .eq('question_index', questionIndex);

// // // // // // //     if (error) throw error;
// // // // // // //     console.log(`✅ Updated evaluation for question ${questionIndex}`);
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error updating answer evaluation:', error);
// // // // // // //     throw error;
// // // // // // //   }
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Complete the interview and calculate final results
// // // // // // //  */
// // // // // // // export async function completeInterview(interviewId: string): Promise<void> {
// // // // // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // // // // //   try {
// // // // // // //     console.log('📊 Completing interview and calculating results...');

// // // // // // //     // Get all answers for this interview
// // // // // // //     const { data: answers, error: answersError } = await supabase
// // // // // // //       .from('interview_answers')
// // // // // // //       .select('*')
// // // // // // //       .eq('interview_id', interviewId);

// // // // // // //     if (answersError) throw answersError;

// // // // // // //     // Calculate overall score
// // // // // // //     const scores = answers?.filter(a => a.score !== null).map(a => a.score) || [];
// // // // // // //     const overallScore = scores.length > 0
// // // // // // //       ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
// // // // // // //       : null;

// // // // // // //     // Collect all strengths and improvements
// // // // // // //     const allStrengths = answers?.flatMap(a => a.strengths || []) || [];
// // // // // // //     const allImprovements = answers?.flatMap(a => a.improvements || []) || [];

// // // // // // //     // Get unique strengths and improvements
// // // // // // //     const uniqueStrengths = [...new Set(allStrengths)].slice(0, 5);
// // // // // // //     const uniqueImprovements = [...new Set(allImprovements)].slice(0, 5);

// // // // // // //     // Generate overall feedback
// // // // // // //     const overallFeedback = generateOverallFeedback(overallScore, answers?.length || 0);

// // // // // // //     // Update interview with results
// // // // // // //     const { error: updateError } = await supabase
// // // // // // //       .from('interviews')
// // // // // // //       .update({
// // // // // // //         status: 'completed',
// // // // // // //         score: overallScore,
// // // // // // //         completed_at: new Date().toISOString(),
// // // // // // //         overall_feedback: overallFeedback,
// // // // // // //         strengths: uniqueStrengths,
// // // // // // //         improvements: uniqueImprovements,
// // // // // // //       })
// // // // // // //       .eq('id', interviewId);

// // // // // // //     if (updateError) throw updateError;

// // // // // // //     console.log(`✅ Interview completed! Overall score: ${overallScore}/100`);
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error completing interview:', error);
// // // // // // //     throw error;
// // // // // // //   }
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Get complete interview results with all answers
// // // // // // //  */
// // // // // // // export async function getInterviewResults(interviewId: string): Promise<InterviewResult | null> {
// // // // // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // // // // //   try {
// // // // // // //     // Get interview details
// // // // // // //     const { data: interview, error: interviewError } = await supabase
// // // // // // //       .from('interviews')
// // // // // // //       .select('*')
// // // // // // //       .eq('id', interviewId)
// // // // // // //       .single();

// // // // // // //     if (interviewError) throw interviewError;
// // // // // // //     if (!interview) return null;

// // // // // // //     // Get all answers
// // // // // // //     const { data: answers, error: answersError } = await supabase
// // // // // // //       .from('interview_answers')
// // // // // // //       .select('*')
// // // // // // //       .eq('interview_id', interviewId)
// // // // // // //       .order('question_index', { ascending: true });

// // // // // // //     if (answersError) throw answersError;

// // // // // // //     // Format the result
// // // // // // //     const formattedInterview: Interview = {
// // // // // // //       id: interview.id,
// // // // // // //       userId: interview.user_id,
// // // // // // //       jobRole: interview.job_role,
// // // // // // //       company: interview.company,
// // // // // // //       interviewType: interview.interview_type,
// // // // // // //       difficulty: interview.difficulty,
// // // // // // //       questions: interview.questions,
// // // // // // //       status: interview.status,
// // // // // // //       score: interview.score,
// // // // // // //       feedback: interview.feedback,
// // // // // // //       overall_feedback: interview.overall_feedback,
// // // // // // //       strengths: interview.strengths || [],
// // // // // // //       improvements: interview.improvements || [],
// // // // // // //       createdAt: new Date(interview.created_at),
// // // // // // //       completedAt: interview.completed_at ? new Date(interview.completed_at) : undefined,
// // // // // // //     };

// // // // // // //     const formattedAnswers: InterviewAnswer[] = (answers || []).map(answer => ({
// // // // // // //       id: answer.id,
// // // // // // //       interview_id: answer.interview_id,
// // // // // // //       question_index: answer.question_index,
// // // // // // //       question_text: answer.question_text,
// // // // // // //       question_category: answer.question_category,
// // // // // // //       user_answer: answer.user_answer,
// // // // // // //       transcript: answer.transcript,
// // // // // // //       audio_url: answer.audio_url,
// // // // // // //       score: answer.score,
// // // // // // //       feedback: answer.feedback,
// // // // // // //       strengths: answer.strengths || [],
// // // // // // //       improvements: answer.improvements || [],
// // // // // // //       created_at: new Date(answer.created_at),
// // // // // // //     }));

// // // // // // //     return {
// // // // // // //       interview: formattedInterview,
// // // // // // //       answers: formattedAnswers,
// // // // // // //     };
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Error getting interview results:', error);
// // // // // // //     return null;
// // // // // // //   }
// // // // // // // }

// // // // // // // /**
// // // // // // //  * Generate overall feedback based on score
// // // // // // //  */
// // // // // // // function generateOverallFeedback(score: number | null, totalQuestions: number): string {
// // // // // // //   if (score === null) {
// // // // // // //     return `Interview completed with ${totalQuestions} questions answered. Evaluation pending.`;
// // // // // // //   }

// // // // // // //   if (score >= 80) {
// // // // // // //     return `Excellent performance! You demonstrated strong knowledge and communication skills across all ${totalQuestions} questions. You're well-prepared for this role.`;
// // // // // // //   } else if (score >= 60) {
// // // // // // //     return `Good performance! You showed solid understanding in most areas. Review the feedback for each question to identify opportunities for improvement.`;
// // // // // // //   } else if (score >= 40) {
// // // // // // //     return `Fair performance. You have a foundation to build on, but there are several areas that need strengthening. Focus on the improvement suggestions provided.`;
// // // // // // //   } else {
// // // // // // //     return `This interview revealed areas that need significant improvement. Carefully review the feedback for each question and practice more before your actual interview.`;
// // // // // // //   }
// // // // // // // }




// // // // // // import { supabase } from './supabase';
// // // // // // import { InterviewAnswer, Interview, InterviewResult } from '@/types';

// // // // // // export async function saveInterviewAnswer(
// // // // // //   interviewId: string,
// // // // // //   questionIndex: number,
// // // // // //   questionText: string,
// // // // // //   questionCategory: string,
// // // // // //   userAnswer: string,
// // // // // //   transcript?: string
// // // // // // ): Promise<void> {
// // // // // //   if (!supabase) throw new Error('Supabase client not initialized');
// // // // // //   const { error } = await supabase
// // // // // //     .from('interview_answers')
// // // // // //     .upsert({
// // // // // //       interview_id: interviewId,
// // // // // //       question_index: questionIndex,
// // // // // //       question_text: questionText,
// // // // // //       question_category: questionCategory,
// // // // // //       user_answer: userAnswer,
// // // // // //       transcript: transcript || userAnswer,
// // // // // //       score: null,
// // // // // //       feedback: null,
// // // // // //       strengths: [],
// // // // // //       improvements: [],
// // // // // //     }, { onConflict: 'interview_id,question_index' });
// // // // // //   if (error) throw error;
// // // // // //   console.log(`✅ Saved answer for question ${questionIndex}`);
// // // // // // }

// // // // // // export async function evaluateFullConversation(
// // // // // //   conversation: { role: 'user' | 'assistant'; content: string }[],
// // // // // //   interviewType: string,
// // // // // //   jobRole: string,
// // // // // //   difficulty: string
// // // // // // ): Promise<{
// // // // // //   overallScore: number;
// // // // // //   overallFeedback: string;
// // // // // //   categories: { name: string; score: number; feedback: string; strengths: string[]; improvements: string[] }[];
// // // // // //   strengths: string[];
// // // // // //   improvements: string[];
// // // // // //   hiringRecommendation: string;
// // // // // // }> {
// // // // // //   try {
// // // // // //     const response = await fetch('/api/evaluate-answer', {
// // // // // //       method: 'POST',
// // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // //       body: JSON.stringify({ conversation, interviewType, jobRole, difficulty }),
// // // // // //     });
// // // // // //     if (!response.ok) throw new Error('Failed to evaluate conversation');
// // // // // //     const result = await response.json();
// // // // // //     console.log(`✅ Conversation evaluated: ${result.overallScore}/100`);
// // // // // //     return result;
// // // // // //   } catch (error) {
// // // // // //     console.error('Error evaluating conversation:', error);
// // // // // //     return {
// // // // // //       overallScore: 60,
// // // // // //       overallFeedback: 'Interview completed. AI evaluation could not be generated at this time.',
// // // // // //       categories: [],
// // // // // //       strengths: ['Completed the interview', 'Demonstrated engagement'],
// // // // // //       improvements: ['Practice more', 'Add specific examples'],
// // // // // //       hiringRecommendation: 'Maybe',
// // // // // //     };
// // // // // //   }
// // // // // // }

// // // // // // export async function evaluateAnswer(
// // // // // //   question: string,
// // // // // //   category: string,
// // // // // //   answer: string,
// // // // // //   jobRole: string,
// // // // // //   difficulty: string
// // // // // // ): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[] }> {
// // // // // //   try {
// // // // // //     const response = await fetch('/api/evaluate-answer', {
// // // // // //       method: 'POST',
// // // // // //       headers: { 'Content-Type': 'application/json' },
// // // // // //       body: JSON.stringify({ question, category, answer, jobRole, difficulty }),
// // // // // //     });
// // // // // //     if (!response.ok) throw new Error('Failed to evaluate answer');
// // // // // //     return await response.json();
// // // // // //   } catch (error) {
// // // // // //     console.error('Error evaluating answer:', error);
// // // // // //     return {
// // // // // //       score: 50,
// // // // // //       feedback: 'Unable to evaluate answer at this time.',
// // // // // //       strengths: ['Answer provided'],
// // // // // //       improvements: ['Could not generate specific feedback'],
// // // // // //     };
// // // // // //   }
// // // // // // }

// // // // // // export async function updateAnswerEvaluation(
// // // // // //   interviewId: string,
// // // // // //   questionIndex: number,
// // // // // //   evaluation: { score: number; feedback: string; strengths: string[]; improvements: string[] }
// // // // // // ): Promise<void> {
// // // // // //   if (!supabase) throw new Error('Supabase client not initialized');
// // // // // //   const { error } = await supabase
// // // // // //     .from('interview_answers')
// // // // // //     .update({
// // // // // //       score: evaluation.score,
// // // // // //       feedback: evaluation.feedback,
// // // // // //       strengths: evaluation.strengths,
// // // // // //       improvements: evaluation.improvements,
// // // // // //     })
// // // // // //     .eq('interview_id', interviewId)
// // // // // //     .eq('question_index', questionIndex);
// // // // // //   if (error) throw error;
// // // // // // }

// // // // // // export async function completeInterview(
// // // // // //   interviewId: string,
// // // // // //   conversationTranscript?: { role: 'user' | 'assistant'; content: string }[],
// // // // // //   interviewType?: string,
// // // // // //   jobRole?: string,
// // // // // //   difficulty?: string
// // // // // // ): Promise<void> {
// // // // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // // // //   try {
// // // // // //     console.log('📊 Completing interview...');

// // // // // //     let overallScore: number = 60;
// // // // // //     let overallFeedback = 'Interview completed.';
// // // // // //     let strengths: string[] = [];
// // // // // //     let improvements: string[] = [];
// // // // // //     let categoryResults: any[] = [];
// // // // // //     let hiringRecommendation = 'Maybe';

// // // // // //     // Evaluate full conversation with Groq if available
// // // // // //     if (conversationTranscript && conversationTranscript.length > 0 && interviewType && jobRole && difficulty) {
// // // // // //       console.log('🤖 Evaluating conversation with Groq...');
// // // // // //       try {
// // // // // //         const evaluation = await evaluateFullConversation(
// // // // // //           conversationTranscript,
// // // // // //           interviewType,
// // // // // //           jobRole,
// // // // // //           difficulty
// // // // // //         );
// // // // // //         overallScore = evaluation.overallScore;
// // // // // //         overallFeedback = evaluation.overallFeedback;
// // // // // //         strengths = evaluation.strengths;
// // // // // //         improvements = evaluation.improvements;
// // // // // //         categoryResults = evaluation.categories;
// // // // // //         hiringRecommendation = evaluation.hiringRecommendation;
// // // // // //       } catch (evalError) {
// // // // // //         console.error('Groq evaluation failed, using defaults:', evalError);
// // // // // //       }
// // // // // //     }

// // // // // //     // Build update object — only include fields that exist in your DB
// // // // // //     // category_results and hiring_recommendation are optional extras
// // // // // //     const updateData: any = {
// // // // // //       status: 'completed',
// // // // // //       score: overallScore,
// // // // // //       completed_at: new Date().toISOString(),
// // // // // //       overall_feedback: overallFeedback,
// // // // // //       strengths,
// // // // // //       improvements,
// // // // // //     };

// // // // // //     // Try to add optional columns — won't break if they don't exist
// // // // // //     try {
// // // // // //       updateData.category_results = categoryResults;
// // // // // //       updateData.hiring_recommendation = hiringRecommendation;
// // // // // //     } catch (_) {}

// // // // // //     const { error } = await supabase
// // // // // //       .from('interviews')
// // // // // //       .update(updateData)
// // // // // //       .eq('id', interviewId);

// // // // // //     if (error) {
// // // // // //       // If error is about missing columns, retry without them
// // // // // //       if (error.message?.includes('category_results') || error.message?.includes('hiring_recommendation')) {
// // // // // //         console.warn('⚠️ Optional columns missing, retrying without them...');
// // // // // //         const { error: retryError } = await supabase
// // // // // //           .from('interviews')
// // // // // //           .update({
// // // // // //             status: 'completed',
// // // // // //             score: overallScore,
// // // // // //             completed_at: new Date().toISOString(),
// // // // // //             overall_feedback: overallFeedback,
// // // // // //             strengths,
// // // // // //             improvements,
// // // // // //           })
// // // // // //           .eq('id', interviewId);
// // // // // //         if (retryError) throw retryError;
// // // // // //       } else {
// // // // // //         throw error;
// // // // // //       }
// // // // // //     }

// // // // // //     console.log(`✅ Interview completed! Score: ${overallScore}/100`);
// // // // // //   } catch (error) {
// // // // // //     console.error('Error completing interview:', error);
// // // // // //     throw error;
// // // // // //   }
// // // // // // }

// // // // // // export async function getInterviewResults(interviewId: string): Promise<InterviewResult | null> {
// // // // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // // // //   try {
// // // // // //     const { data: interview, error: interviewError } = await supabase
// // // // // //       .from('interviews')
// // // // // //       .select('*')
// // // // // //       .eq('id', interviewId)
// // // // // //       .single();

// // // // // //     if (interviewError) throw interviewError;
// // // // // //     if (!interview) return null;

// // // // // //     const { data: answers, error: answersError } = await supabase
// // // // // //       .from('interview_answers')
// // // // // //       .select('*')
// // // // // //       .eq('interview_id', interviewId)
// // // // // //       .order('question_index', { ascending: true });

// // // // // //     if (answersError) throw answersError;

// // // // // //     const formattedInterview: Interview = {
// // // // // //       id: interview.id,
// // // // // //       userId: interview.user_id,
// // // // // //       jobRole: interview.job_role,
// // // // // //       company: interview.company,
// // // // // //       interviewType: interview.interview_type,
// // // // // //       difficulty: interview.difficulty,
// // // // // //       questions: interview.questions,
// // // // // //       status: interview.status,
// // // // // //       score: interview.score,
// // // // // //       feedback: interview.feedback,
// // // // // //       overall_feedback: interview.overall_feedback,
// // // // // //       strengths: interview.strengths || [],
// // // // // //       improvements: interview.improvements || [],
// // // // // //       // Safely read optional columns
// // // // // //       category_results: interview.category_results || [],
// // // // // //       hiring_recommendation: interview.hiring_recommendation || '',
// // // // // //       createdAt: new Date(interview.created_at),
// // // // // //       completedAt: interview.completed_at ? new Date(interview.completed_at) : undefined,
// // // // // //     } as any;

// // // // // //     const formattedAnswers: InterviewAnswer[] = (answers || []).map(answer => ({
// // // // // //       id: answer.id,
// // // // // //       interview_id: answer.interview_id,
// // // // // //       question_index: answer.question_index,
// // // // // //       question_text: answer.question_text,
// // // // // //       question_category: answer.question_category,
// // // // // //       user_answer: answer.user_answer,
// // // // // //       transcript: answer.transcript,
// // // // // //       audio_url: answer.audio_url,
// // // // // //       score: answer.score,
// // // // // //       feedback: answer.feedback,
// // // // // //       strengths: answer.strengths || [],
// // // // // //       improvements: answer.improvements || [],
// // // // // //       created_at: new Date(answer.created_at),
// // // // // //     }));

// // // // // //     return { interview: formattedInterview, answers: formattedAnswers };
// // // // // //   } catch (error) {
// // // // // //     console.error('Error getting interview results:', error);
// // // // // //     return null;
// // // // // //   }
// // // // // // }

// // // // // // function generateOverallFeedback(score: number | null, totalQuestions: number): string {
// // // // // //   if (score === null) return `Interview completed with ${totalQuestions} questions answered.`;
// // // // // //   if (score >= 80) return 'Excellent performance! You demonstrated strong knowledge and communication skills.';
// // // // // //   if (score >= 60) return 'Good performance! You showed solid understanding in most areas.';
// // // // // //   if (score >= 40) return 'Fair performance. There are several areas that need strengthening.';
// // // // // //   return 'This interview revealed areas that need significant improvement.';
// // // // // // }




// // // // // import { supabase } from './supabase';
// // // // // import { InterviewAnswer, Interview, InterviewResult } from '@/types';

// // // // // export async function saveInterviewAnswer(
// // // // //   interviewId: string,
// // // // //   questionIndex: number,
// // // // //   questionText: string,
// // // // //   questionCategory: string,
// // // // //   userAnswer: string,
// // // // //   transcript?: string
// // // // // ): Promise<void> {
// // // // //   if (!supabase) throw new Error('Supabase client not initialized');
// // // // //   const { error } = await supabase
// // // // //     .from('interview_answers')
// // // // //     .upsert({
// // // // //       interview_id: interviewId,
// // // // //       question_index: questionIndex,
// // // // //       question_text: questionText,
// // // // //       question_category: questionCategory,
// // // // //       user_answer: userAnswer,
// // // // //       transcript: transcript || userAnswer,
// // // // //       score: null,
// // // // //       feedback: null,
// // // // //       strengths: [],
// // // // //       improvements: [],
// // // // //     }, { onConflict: 'interview_id,question_index' });
// // // // //   if (error) throw error;
// // // // //   console.log(`✅ Saved answer for question ${questionIndex}`);
// // // // // }

// // // // // export async function evaluateFullConversation(
// // // // //   conversation: { role: 'user' | 'assistant'; content: string }[],
// // // // //   interviewType: string,
// // // // //   jobRole: string,
// // // // //   difficulty: string
// // // // // ): Promise<{
// // // // //   overallScore: number;
// // // // //   overallFeedback: string;
// // // // //   categories: { name: string; score: number; feedback: string; strengths: string[]; improvements: string[] }[];
// // // // //   strengths: string[];
// // // // //   improvements: string[];
// // // // //   hiringRecommendation: string;
// // // // // }> {
// // // // //   const defaultResult = {
// // // // //     overallScore: 60,
// // // // //     overallFeedback: 'Interview completed. AI evaluation could not be generated at this time.',
// // // // //     categories: [],
// // // // //     strengths: ['Completed the interview', 'Demonstrated engagement'],
// // // // //     improvements: ['Practice more', 'Add specific examples'],
// // // // //     hiringRecommendation: 'Maybe',
// // // // //   };

// // // // //   try {
// // // // //     // Only keep last 20 messages to avoid token limit / timeout with large convos
// // // // //     const cleaned = conversation
// // // // //       .filter(m => m.content && m.content.trim().length > 2)
// // // // //       .slice(-20);

// // // // //     console.log(`📤 Sending ${cleaned.length} messages to Groq...`);

// // // // //     // 25 second timeout
// // // // //     const controller = new AbortController();
// // // // //     const timeoutId = setTimeout(() => {
// // // // //       console.warn('⏱️ Groq timeout — aborting');
// // // // //       controller.abort();
// // // // //     }, 25000);

// // // // //     const response = await fetch('/api/evaluate-answer', {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ conversation: cleaned, interviewType, jobRole, difficulty }),
// // // // //       signal: controller.signal,
// // // // //     });

// // // // //     clearTimeout(timeoutId);

// // // // //     if (!response.ok) throw new Error(`Groq API error: ${response.status}`);
// // // // //     const result = await response.json();
// // // // //     console.log(`✅ Groq evaluation done: ${result.overallScore}/100`);
// // // // //     return result;
// // // // //   } catch (error: any) {
// // // // //     if (error?.name === 'AbortError') {
// // // // //       console.error('⏱️ Groq evaluation timed out — using defaults');
// // // // //     } else {
// // // // //       console.error('Error evaluating conversation:', error);
// // // // //     }
// // // // //     return defaultResult;
// // // // //   }
// // // // // }

// // // // // export async function evaluateAnswer(
// // // // //   question: string,
// // // // //   category: string,
// // // // //   answer: string,
// // // // //   jobRole: string,
// // // // //   difficulty: string
// // // // // ): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[] }> {
// // // // //   try {
// // // // //     const response = await fetch('/api/evaluate-answer', {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify({ question, category, answer, jobRole, difficulty }),
// // // // //     });
// // // // //     if (!response.ok) throw new Error('Failed to evaluate answer');
// // // // //     return await response.json();
// // // // //   } catch (error) {
// // // // //     console.error('Error evaluating answer:', error);
// // // // //     return {
// // // // //       score: 50,
// // // // //       feedback: 'Unable to evaluate answer at this time.',
// // // // //       strengths: ['Answer provided'],
// // // // //       improvements: ['Could not generate specific feedback'],
// // // // //     };
// // // // //   }
// // // // // }

// // // // // export async function updateAnswerEvaluation(
// // // // //   interviewId: string,
// // // // //   questionIndex: number,
// // // // //   evaluation: { score: number; feedback: string; strengths: string[]; improvements: string[] }
// // // // // ): Promise<void> {
// // // // //   if (!supabase) throw new Error('Supabase client not initialized');
// // // // //   const { error } = await supabase
// // // // //     .from('interview_answers')
// // // // //     .update({
// // // // //       score: evaluation.score,
// // // // //       feedback: evaluation.feedback,
// // // // //       strengths: evaluation.strengths,
// // // // //       improvements: evaluation.improvements,
// // // // //     })
// // // // //     .eq('interview_id', interviewId)
// // // // //     .eq('question_index', questionIndex);
// // // // //   if (error) throw error;
// // // // // }

// // // // // export async function completeInterview(
// // // // //   interviewId: string,
// // // // //   conversationTranscript?: { role: 'user' | 'assistant'; content: string }[],
// // // // //   interviewType?: string,
// // // // //   jobRole?: string,
// // // // //   difficulty?: string
// // // // // ): Promise<void> {
// // // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // // //   console.log('📊 Completing interview...');

// // // // //   // Step 1: Get Groq evaluation (never throws — always returns defaults on failure)
// // // // //   let overallScore = 60;
// // // // //   let overallFeedback = 'Interview completed.';
// // // // //   let strengths: string[] = ['Completed the interview'];
// // // // //   let improvements: string[] = ['Practice regularly'];
// // // // //   let categoryResults: any[] = [];
// // // // //   let hiringRecommendation = 'Maybe';

// // // // //   if (conversationTranscript && conversationTranscript.length > 0 && interviewType && jobRole && difficulty) {
// // // // //     try {
// // // // //       const evaluation = await evaluateFullConversation(
// // // // //         conversationTranscript,
// // // // //         interviewType,
// // // // //         jobRole,
// // // // //         difficulty
// // // // //       );
// // // // //       overallScore = evaluation.overallScore;
// // // // //       overallFeedback = evaluation.overallFeedback;
// // // // //       strengths = evaluation.strengths;
// // // // //       improvements = evaluation.improvements;
// // // // //       categoryResults = evaluation.categories;
// // // // //       hiringRecommendation = evaluation.hiringRecommendation;
// // // // //     } catch (e) {
// // // // //       console.error('Evaluation failed silently:', e);
// // // // //       // Keep defaults — do NOT throw
// // // // //     }
// // // // //   }

// // // // //   // Step 2: Save to DB — first try with all columns
// // // // //   try {
// // // // //     const { error } = await supabase
// // // // //       .from('interviews')
// // // // //       .update({
// // // // //         status: 'completed',
// // // // //         score: overallScore,
// // // // //         completed_at: new Date().toISOString(),
// // // // //         overall_feedback: overallFeedback,
// // // // //         strengths,
// // // // //         improvements,
// // // // //         category_results: categoryResults,
// // // // //         hiring_recommendation: hiringRecommendation,
// // // // //       })
// // // // //       .eq('id', interviewId);

// // // // //     if (error) throw error;
// // // // //     console.log(`✅ Interview saved with all fields. Score: ${overallScore}/100`);
// // // // //     return;
// // // // //   } catch (fullError: any) {
// // // // //     console.warn('Full update failed, trying without optional columns:', fullError?.message);
// // // // //   }

// // // // //   // Step 3: Retry without optional columns if above failed
// // // // //   try {
// // // // //     const { error } = await supabase
// // // // //       .from('interviews')
// // // // //       .update({
// // // // //         status: 'completed',
// // // // //         score: overallScore,
// // // // //         completed_at: new Date().toISOString(),
// // // // //         overall_feedback: overallFeedback,
// // // // //         strengths,
// // // // //         improvements,
// // // // //       })
// // // // //       .eq('id', interviewId);

// // // // //     if (error) throw error;
// // // // //     console.log(`✅ Interview saved (basic fields). Score: ${overallScore}/100`);
// // // // //   } catch (basicError) {
// // // // //     console.error('Basic update also failed:', basicError);
// // // // //     // Still don't throw — let the redirect happen
// // // // //   }
// // // // // }

// // // // // export async function getInterviewResults(interviewId: string): Promise<InterviewResult | null> {
// // // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // // //   try {
// // // // //     const { data: interview, error: interviewError } = await supabase
// // // // //       .from('interviews')
// // // // //       .select('*')
// // // // //       .eq('id', interviewId)
// // // // //       .single();

// // // // //     if (interviewError) throw interviewError;
// // // // //     if (!interview) return null;

// // // // //     const { data: answers, error: answersError } = await supabase
// // // // //       .from('interview_answers')
// // // // //       .select('*')
// // // // //       .eq('interview_id', interviewId)
// // // // //       .order('question_index', { ascending: true });

// // // // //     if (answersError) throw answersError;

// // // // //     const formattedInterview = {
// // // // //       id: interview.id,
// // // // //       userId: interview.user_id,
// // // // //       jobRole: interview.job_role,
// // // // //       company: interview.company,
// // // // //       interviewType: interview.interview_type,
// // // // //       difficulty: interview.difficulty,
// // // // //       questions: interview.questions,
// // // // //       status: interview.status,
// // // // //       score: interview.score,
// // // // //       feedback: interview.feedback,
// // // // //       overall_feedback: interview.overall_feedback,
// // // // //       strengths: interview.strengths || [],
// // // // //       improvements: interview.improvements || [],
// // // // //       category_results: interview.category_results || [],
// // // // //       hiring_recommendation: interview.hiring_recommendation || '',
// // // // //       createdAt: new Date(interview.created_at),
// // // // //       completedAt: interview.completed_at ? new Date(interview.completed_at) : undefined,
// // // // //     } as any;

// // // // //     const formattedAnswers: InterviewAnswer[] = (answers || []).map(answer => ({
// // // // //       id: answer.id,
// // // // //       interview_id: answer.interview_id,
// // // // //       question_index: answer.question_index,
// // // // //       question_text: answer.question_text,
// // // // //       question_category: answer.question_category,
// // // // //       user_answer: answer.user_answer,
// // // // //       transcript: answer.transcript,
// // // // //       audio_url: answer.audio_url,
// // // // //       score: answer.score,
// // // // //       feedback: answer.feedback,
// // // // //       strengths: answer.strengths || [],
// // // // //       improvements: answer.improvements || [],
// // // // //       created_at: new Date(answer.created_at),
// // // // //     }));

// // // // //     return { interview: formattedInterview, answers: formattedAnswers };
// // // // //   } catch (error) {
// // // // //     console.error('Error getting interview results:', error);
// // // // //     return null;
// // // // //   }
// // // // // }




// // // // import { supabase } from './supabase';
// // // // import { InterviewAnswer, Interview, InterviewResult } from '@/types';

// // // // interface ConversationMessage {
// // // //   role: 'user' | 'assistant';
// // // //   content: string;
// // // // }

// // // // /**
// // // //  * STEP 1 (session page): Save conversation JSON to DB instantly, mark as 'processing'
// // // //  * No Groq call here — just a fast Supabase write
// // // //  */
// // // // export async function saveConversationAndRedirect(
// // // //   interviewId: string,
// // // //   conversation: ConversationMessage[],
// // // //   interviewType: string,
// // // //   jobRole: string,
// // // //   difficulty: string
// // // // ): Promise<void> {
// // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // //   console.log(`💾 Saving ${conversation.length} messages as JSON...`);

// // // //   const { error } = await supabase
// // // //     .from('interviews')
// // // //     .update({
// // // //       status: 'processing',
// // // //       conversation_json: conversation,
// // // //       completed_at: new Date().toISOString(),
// // // //     })
// // // //     .eq('id', interviewId);

// // // //   if (error) throw error;
// // // //   console.log('✅ Conversation JSON saved. Redirecting to results...');
// // // // }

// // // // /**
// // // //  * STEP 2 (results page): Read conversation JSON from DB, send to Groq, save results
// // // //  */
// // // // export async function evaluateAndSaveResults(
// // // //   interviewId: string,
// // // //   conversation: ConversationMessage[],
// // // //   interviewType: string,
// // // //   jobRole: string,
// // // //   difficulty: string
// // // // ): Promise<{
// // // //   overallScore: number;
// // // //   overallFeedback: string;
// // // //   categories: { name: string; score: number; feedback: string; strengths: string[]; improvements: string[] }[];
// // // //   strengths: string[];
// // // //   improvements: string[];
// // // //   hiringRecommendation: string;
// // // // }> {
// // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // //   // Trim to last 20 messages to avoid token limits
// // // //   const trimmed = conversation
// // // //     .filter(m => m.content && m.content.trim().length > 2)
// // // //     .slice(-20);

// // // //   console.log(`🤖 Sending ${trimmed.length} messages to Groq for evaluation...`);

// // // //   const defaultResult = {
// // // //     overallScore: 60,
// // // //     overallFeedback: 'Interview completed. Your conversation has been recorded and evaluated.',
// // // //     categories: [],
// // // //     strengths: ['Completed the interview', 'Engaged with the AI interviewer'],
// // // //     improvements: ['Practice more regularly', 'Add specific examples to your answers'],
// // // //     hiringRecommendation: 'Maybe',
// // // //   };

// // // //   let result = defaultResult;

// // // //   try {
// // // //     // Call Groq with a 25s timeout
// // // //     const controller = new AbortController();
// // // //     const timeoutId = setTimeout(() => controller.abort(), 25000);

// // // //     const response = await fetch('/api/evaluate-answer', {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({
// // // //         conversation: trimmed,
// // // //         interviewType,
// // // //         jobRole,
// // // //         difficulty,
// // // //       }),
// // // //       signal: controller.signal,
// // // //     });

// // // //     clearTimeout(timeoutId);

// // // //     if (response.ok) {
// // // //       result = await response.json();
// // // //       console.log(`✅ Groq evaluation done: ${result.overallScore}/100`);
// // // //     } else {
// // // //       console.error('Groq API error:', response.status);
// // // //     }
// // // //   } catch (e: any) {
// // // //     if (e?.name === 'AbortError') {
// // // //       console.error('⏱️ Groq timed out — using default scores');
// // // //     } else {
// // // //       console.error('Groq evaluation failed:', e);
// // // //     }
// // // //   }

// // // //   // Save results back to DB
// // // //   console.log('💾 Saving Groq results to DB...');
// // // //   try {
// // // //     const { error } = await supabase
// // // //       .from('interviews')
// // // //       .update({
// // // //         status: 'completed',
// // // //         score: result.overallScore,
// // // //         overall_feedback: result.overallFeedback,
// // // //         strengths: result.strengths,
// // // //         improvements: result.improvements,
// // // //         category_results: result.categories,
// // // //         hiring_recommendation: result.hiringRecommendation,
// // // //       })
// // // //       .eq('id', interviewId);

// // // //     if (error) {
// // // //       // Retry without optional columns if they don't exist yet
// // // //       console.warn('Retrying without optional columns...');
// // // //       await supabase
// // // //         .from('interviews')
// // // //         .update({
// // // //           status: 'completed',
// // // //           score: result.overallScore,
// // // //           overall_feedback: result.overallFeedback,
// // // //           strengths: result.strengths,
// // // //           improvements: result.improvements,
// // // //         })
// // // //         .eq('id', interviewId);
// // // //     }
// // // //   } catch (dbError) {
// // // //     console.error('DB save failed:', dbError);
// // // //   }

// // // //   return result;
// // // // }

// // // // // ── LEGACY FUNCTIONS (kept for compatibility) ─────────────────────────────────

// // // // export async function saveInterviewAnswer(
// // // //   interviewId: string,
// // // //   questionIndex: number,
// // // //   questionText: string,
// // // //   questionCategory: string,
// // // //   userAnswer: string,
// // // //   transcript?: string
// // // // ): Promise<void> {
// // // //   if (!supabase) throw new Error('Supabase client not initialized');
// // // //   const { error } = await supabase
// // // //     .from('interview_answers')
// // // //     .upsert({
// // // //       interview_id: interviewId,
// // // //       question_index: questionIndex,
// // // //       question_text: questionText,
// // // //       question_category: questionCategory,
// // // //       user_answer: userAnswer,
// // // //       transcript: transcript || userAnswer,
// // // //       score: null,
// // // //       feedback: null,
// // // //       strengths: [],
// // // //       improvements: [],
// // // //     }, { onConflict: 'interview_id,question_index' });
// // // //   if (error) console.error('saveInterviewAnswer error (non-fatal):', error);
// // // // }

// // // // export async function evaluateAnswer(
// // // //   question: string,
// // // //   category: string,
// // // //   answer: string,
// // // //   jobRole: string,
// // // //   difficulty: string
// // // // ): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[] }> {
// // // //   try {
// // // //     const response = await fetch('/api/evaluate-answer', {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify({ question, category, answer, jobRole, difficulty }),
// // // //     });
// // // //     if (!response.ok) throw new Error('Failed');
// // // //     return await response.json();
// // // //   } catch {
// // // //     return { score: 50, feedback: 'Unable to evaluate.', strengths: ['Answer provided'], improvements: ['Add more detail'] };
// // // //   }
// // // // }

// // // // export async function updateAnswerEvaluation(
// // // //   interviewId: string,
// // // //   questionIndex: number,
// // // //   evaluation: { score: number; feedback: string; strengths: string[]; improvements: string[] }
// // // // ): Promise<void> {
// // // //   if (!supabase) return;
// // // //   await supabase
// // // //     .from('interview_answers')
// // // //     .update(evaluation)
// // // //     .eq('interview_id', interviewId)
// // // //     .eq('question_index', questionIndex);
// // // // }

// // // // export async function completeInterview(interviewId: string): Promise<void> {
// // // //   if (!supabase) return;
// // // //   await supabase
// // // //     .from('interviews')
// // // //     .update({ status: 'completed', completed_at: new Date().toISOString() })
// // // //     .eq('id', interviewId);
// // // // }

// // // // export async function getInterviewResults(interviewId: string): Promise<InterviewResult | null> {
// // // //   if (!supabase) throw new Error('Supabase client not initialized');

// // // //   try {
// // // //     const { data: interview, error } = await supabase
// // // //       .from('interviews')
// // // //       .select('*')
// // // //       .eq('id', interviewId)
// // // //       .single();

// // // //     if (error) throw error;
// // // //     if (!interview) return null;

// // // //     const { data: answers } = await supabase
// // // //       .from('interview_answers')
// // // //       .select('*')
// // // //       .eq('interview_id', interviewId)
// // // //       .order('question_index', { ascending: true });

// // // //     const formattedInterview = {
// // // //       id: interview.id,
// // // //       userId: interview.user_id,
// // // //       jobRole: interview.job_role,
// // // //       company: interview.company,
// // // //       interviewType: interview.interview_type,
// // // //       difficulty: interview.difficulty,
// // // //       questions: interview.questions,
// // // //       status: interview.status,
// // // //       score: interview.score,
// // // //       feedback: interview.feedback,
// // // //       overall_feedback: interview.overall_feedback,
// // // //       strengths: interview.strengths || [],
// // // //       improvements: interview.improvements || [],
// // // //       category_results: interview.category_results || [],
// // // //       hiring_recommendation: interview.hiring_recommendation || '',
// // // //       conversation_json: interview.conversation_json || [],
// // // //       createdAt: new Date(interview.created_at),
// // // //       completedAt: interview.completed_at ? new Date(interview.completed_at) : undefined,
// // // //     } as any;

// // // //     const formattedAnswers: InterviewAnswer[] = (answers || []).map(a => ({
// // // //       id: a.id,
// // // //       interview_id: a.interview_id,
// // // //       question_index: a.question_index,
// // // //       question_text: a.question_text,
// // // //       question_category: a.question_category,
// // // //       user_answer: a.user_answer,
// // // //       transcript: a.transcript,
// // // //       audio_url: a.audio_url,
// // // //       score: a.score,
// // // //       feedback: a.feedback,
// // // //       strengths: a.strengths || [],
// // // //       improvements: a.improvements || [],
// // // //       created_at: new Date(a.created_at),
// // // //     }));

// // // //     return { interview: formattedInterview, answers: formattedAnswers };
// // // //   } catch (error) {
// // // //     console.error('Error getting results:', error);
// // // //     return null;
// // // //   }
// // // // }




// // // import { supabase } from './supabase';
// // // import { InterviewAnswer, Interview, InterviewResult } from '@/types';

// // // interface ConversationMessage {
// // //   role: 'user' | 'assistant';
// // //   content: string;
// // // }

// // // /**
// // //  * STEP 1 (session page): Save conversation JSON to DB instantly, mark as 'processing'
// // //  * No Groq call here — just a fast Supabase write
// // //  */
// // // export async function saveConversationAndRedirect(
// // //   interviewId: string,
// // //   conversation: ConversationMessage[],
// // //   interviewType: string,
// // //   jobRole: string,
// // //   difficulty: string
// // // ): Promise<void> {
// // //   if (!supabase) throw new Error('Supabase client not initialized');

// // //   console.log(`💾 Saving ${conversation.length} messages as JSON...`);

// // //   const { error } = await supabase
// // //     .from('interviews')
// // //     .update({
// // //       status: 'processing',
// // //       conversation_json: conversation,
// // //       completed_at: new Date().toISOString(),
// // //     })
// // //     .eq('id', interviewId);

// // //   if (error) throw error;
// // //   console.log('✅ Conversation JSON saved. Redirecting to results...');
// // // }

// // // /**
// // //  * STEP 2 (results page): Read conversation JSON from DB, send to Groq, save results
// // //  */
// // // export async function evaluateAndSaveResults(
// // //   interviewId: string,
// // //   conversation: ConversationMessage[],
// // //   interviewType: string,
// // //   jobRole: string,
// // //   difficulty: string
// // // ): Promise<{
// // //   overallScore: number;
// // //   overallFeedback: string;
// // //   categories: { name: string; score: number; feedback: string; strengths: string[]; improvements: string[] }[];
// // //   strengths: string[];
// // //   improvements: string[];
// // //   hiringRecommendation: string;
// // // }> {
// // //   if (!supabase) throw new Error('Supabase client not initialized');

// // //   // Filter out very short/empty messages only — no artificial limit
// // //   // JSON is compact so full conversation is fine for Groq's 32k token limit
// // //   const trimmed = conversation
// // //     .filter(m => m.content && m.content.trim().length > 2);

// // //   console.log(`🤖 Sending ${trimmed.length} messages to Groq for evaluation...`);

// // //   const defaultResult = {
// // //     overallScore: 60,
// // //     overallFeedback: 'Interview completed. Your conversation has been recorded and evaluated.',
// // //     categories: [],
// // //     strengths: ['Completed the interview', 'Engaged with the AI interviewer'],
// // //     improvements: ['Practice more regularly', 'Add specific examples to your answers'],
// // //     hiringRecommendation: 'Maybe',
// // //   };

// // //   let result = defaultResult;

// // //   try {
// // //     // Call Groq with a 25s timeout
// // //     const controller = new AbortController();
// // //     const timeoutId = setTimeout(() => controller.abort(), 25000);

// // //     const response = await fetch('/api/evaluate-answer', {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({
// // //         conversation: trimmed,
// // //         interviewType,
// // //         jobRole,
// // //         difficulty,
// // //       }),
// // //       signal: controller.signal,
// // //     });

// // //     clearTimeout(timeoutId);

// // //     if (response.ok) {
// // //       result = await response.json();
// // //       console.log(`✅ Groq evaluation done: ${result.overallScore}/100`);
// // //     } else {
// // //       console.error('Groq API error:', response.status);
// // //     }
// // //   } catch (e: any) {
// // //     if (e?.name === 'AbortError') {
// // //       console.error('⏱️ Groq timed out — using default scores');
// // //     } else {
// // //       console.error('Groq evaluation failed:', e);
// // //     }
// // //   }

// // //   // Save results back to DB
// // //   console.log('💾 Saving Groq results to DB...');
// // //   try {
// // //     const { error } = await supabase
// // //       .from('interviews')
// // //       .update({
// // //         status: 'completed',
// // //         score: result.overallScore,
// // //         overall_feedback: result.overallFeedback,
// // //         strengths: result.strengths,
// // //         improvements: result.improvements,
// // //         category_results: result.categories,
// // //         hiring_recommendation: result.hiringRecommendation,
// // //       })
// // //       .eq('id', interviewId);

// // //     if (error) {
// // //       // Retry without optional columns if they don't exist yet
// // //       console.warn('Retrying without optional columns...');
// // //       await supabase
// // //         .from('interviews')
// // //         .update({
// // //           status: 'completed',
// // //           score: result.overallScore,
// // //           overall_feedback: result.overallFeedback,
// // //           strengths: result.strengths,
// // //           improvements: result.improvements,
// // //         })
// // //         .eq('id', interviewId);
// // //     }
// // //   } catch (dbError) {
// // //     console.error('DB save failed:', dbError);
// // //   }

// // //   return result;
// // // }

// // // // ── LEGACY FUNCTIONS (kept for compatibility) ─────────────────────────────────

// // // export async function saveInterviewAnswer(
// // //   interviewId: string,
// // //   questionIndex: number,
// // //   questionText: string,
// // //   questionCategory: string,
// // //   userAnswer: string,
// // //   transcript?: string
// // // ): Promise<void> {
// // //   if (!supabase) throw new Error('Supabase client not initialized');
// // //   const { error } = await supabase
// // //     .from('interview_answers')
// // //     .upsert({
// // //       interview_id: interviewId,
// // //       question_index: questionIndex,
// // //       question_text: questionText,
// // //       question_category: questionCategory,
// // //       user_answer: userAnswer,
// // //       transcript: transcript || userAnswer,
// // //       score: null,
// // //       feedback: null,
// // //       strengths: [],
// // //       improvements: [],
// // //     }, { onConflict: 'interview_id,question_index' });
// // //   if (error) console.error('saveInterviewAnswer error (non-fatal):', error);
// // // }

// // // export async function evaluateAnswer(
// // //   question: string,
// // //   category: string,
// // //   answer: string,
// // //   jobRole: string,
// // //   difficulty: string
// // // ): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[] }> {
// // //   try {
// // //     const response = await fetch('/api/evaluate-answer', {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ question, category, answer, jobRole, difficulty }),
// // //     });
// // //     if (!response.ok) throw new Error('Failed');
// // //     return await response.json();
// // //   } catch {
// // //     return { score: 50, feedback: 'Unable to evaluate.', strengths: ['Answer provided'], improvements: ['Add more detail'] };
// // //   }
// // // }

// // // export async function updateAnswerEvaluation(
// // //   interviewId: string,
// // //   questionIndex: number,
// // //   evaluation: { score: number; feedback: string; strengths: string[]; improvements: string[] }
// // // ): Promise<void> {
// // //   if (!supabase) return;
// // //   await supabase
// // //     .from('interview_answers')
// // //     .update(evaluation)
// // //     .eq('interview_id', interviewId)
// // //     .eq('question_index', questionIndex);
// // // }

// // // export async function completeInterview(interviewId: string): Promise<void> {
// // //   if (!supabase) return;
// // //   await supabase
// // //     .from('interviews')
// // //     .update({ status: 'completed', completed_at: new Date().toISOString() })
// // //     .eq('id', interviewId);
// // // }

// // // export async function getInterviewResults(interviewId: string): Promise<InterviewResult | null> {
// // //   if (!supabase) throw new Error('Supabase client not initialized');

// // //   try {
// // //     const { data: interview, error } = await supabase
// // //       .from('interviews')
// // //       .select('*')
// // //       .eq('id', interviewId)
// // //       .single();

// // //     if (error) throw error;
// // //     if (!interview) return null;

// // //     const { data: answers } = await supabase
// // //       .from('interview_answers')
// // //       .select('*')
// // //       .eq('interview_id', interviewId)
// // //       .order('question_index', { ascending: true });

// // //     const formattedInterview = {
// // //       id: interview.id,
// // //       userId: interview.user_id,
// // //       jobRole: interview.job_role,
// // //       company: interview.company,
// // //       interviewType: interview.interview_type,
// // //       difficulty: interview.difficulty,
// // //       questions: interview.questions,
// // //       status: interview.status,
// // //       score: interview.score,
// // //       feedback: interview.feedback,
// // //       overall_feedback: interview.overall_feedback,
// // //       strengths: interview.strengths || [],
// // //       improvements: interview.improvements || [],
// // //       category_results: interview.category_results || [],
// // //       hiring_recommendation: interview.hiring_recommendation || '',
// // //       conversation_json: interview.conversation_json || [],
// // //       createdAt: new Date(interview.created_at),
// // //       completedAt: interview.completed_at ? new Date(interview.completed_at) : undefined,
// // //     } as any;

// // //     const formattedAnswers: InterviewAnswer[] = (answers || []).map(a => ({
// // //       id: a.id,
// // //       interview_id: a.interview_id,
// // //       question_index: a.question_index,
// // //       question_text: a.question_text,
// // //       question_category: a.question_category,
// // //       user_answer: a.user_answer,
// // //       transcript: a.transcript,
// // //       audio_url: a.audio_url,
// // //       score: a.score,
// // //       feedback: a.feedback,
// // //       strengths: a.strengths || [],
// // //       improvements: a.improvements || [],
// // //       created_at: new Date(a.created_at),
// // //     }));

// // //     return { interview: formattedInterview, answers: formattedAnswers };
// // //   } catch (error) {
// // //     console.error('Error getting results:', error);
// // //     return null;
// // //   }
// // // }







// // import { supabase } from './supabase';
// // import { InterviewAnswer, Interview, InterviewResult } from '@/types';

// // interface ConversationMessage {
// //   role: 'user' | 'assistant';
// //   content: string;
// // }

// // /**
// //  * STEP 1 (session page): Save conversation JSON to DB instantly, mark as 'processing'
// //  * No Groq call here — just a fast Supabase write
// //  */
// // export async function saveConversationAndRedirect(
// //   interviewId: string,
// //   conversation: ConversationMessage[],
// //   interviewType: string,
// //   jobRole: string,
// //   difficulty: string
// // ): Promise<void> {
// //   if (!supabase) throw new Error('Supabase client not initialized');

// //   console.log(`💾 Saving ${conversation.length} messages as JSON...`);

// //   const { error } = await supabase
// //     .from('interviews')
// //     .update({
// //       status: 'processing',
// //       conversation_json: conversation,
// //       completed_at: new Date().toISOString(),
// //     })
// //     .eq('id', interviewId);

// //   if (error) throw error;
// //   console.log('✅ Conversation JSON saved. Redirecting to results...');
// // }

// // /**
// //  * STEP 2 (results page): Read conversation JSON from DB, send to Groq, save results
// //  */
// // export async function evaluateAndSaveResults(
// //   interviewId: string,
// //   conversation: ConversationMessage[],
// //   interviewType: string,
// //   jobRole: string,
// //   difficulty: string
// // ): Promise<{
// //   overallScore: number;
// //   overallFeedback: string;
// //   categories: { name: string; score: number; feedback: string; strengths: string[]; improvements: string[] }[];
// //   strengths: string[];
// //   improvements: string[];
// //   hiringRecommendation: string;
// // }> {
// //   if (!supabase) throw new Error('Supabase client not initialized');

// //   // Filter out very short/empty messages only — no artificial limit
// //   // JSON is compact so full conversation is fine for Groq's 32k token limit
// //   const trimmed = conversation
// //     .filter(m => m.content && m.content.trim().length > 2);

// //   console.log(`🤖 Sending ${trimmed.length} messages to Claude for evaluation...`);

// //   const defaultResult = {
// //     overallScore: 60,
// //     overallFeedback: 'Interview completed. Your conversation has been recorded and evaluated.',
// //     categories: [],
// //     strengths: ['Completed the interview', 'Engaged with the AI interviewer'],
// //     improvements: ['Practice more regularly', 'Add specific examples to your answers'],
// //     hiringRecommendation: 'Maybe',
// //   };

// //   let result = defaultResult;

// //   try {
// //     // Call Groq with a 25s timeout
// //     const controller = new AbortController();
// //     const timeoutId = setTimeout(() => controller.abort(), 25000);

// //     const response = await fetch('/api/evaluate-answer', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({
// //         conversation: trimmed,
// //         interviewType,
// //         jobRole,
// //         difficulty,
// //       }),
// //       signal: controller.signal,
// //     });

// //     clearTimeout(timeoutId);

// //     if (response.ok) {
// //       result = await response.json();
// //       console.log(`✅ Claude evaluation done: ${result.overallScore}/100`);
// //     } else {
// //       console.error('Groq API error:', response.status);
// //     }
// //   } catch (e: any) {
// //     if (e?.name === 'AbortError') {
// //       console.error('⏱️ Groq timed out — using default scores');
// //     } else {
// //       console.error('Groq evaluation failed:', e);
// //     }
// //   }

// //   // Save results back to DB
// //   console.log('💾 Saving Groq results to DB...');
// //   try {
// //     const { error } = await supabase
// //       .from('interviews')
// //       .update({
// //         status: 'completed',
// //         score: result.overallScore,
// //         overall_feedback: result.overallFeedback,
// //         strengths: result.strengths,
// //         improvements: result.improvements,
// //         category_results: result.categories,
// //         hiring_recommendation: result.hiringRecommendation,
// //       })
// //       .eq('id', interviewId);

// //     if (error) {
// //       // Retry without optional columns if they don't exist yet
// //       console.warn('Retrying without optional columns...');
// //       await supabase
// //         .from('interviews')
// //         .update({
// //           status: 'completed',
// //           score: result.overallScore,
// //           overall_feedback: result.overallFeedback,
// //           strengths: result.strengths,
// //           improvements: result.improvements,
// //         })
// //         .eq('id', interviewId);
// //     }
// //   } catch (dbError) {
// //     console.error('DB save failed:', dbError);
// //   }

// //   return result;
// // }

// // // ── LEGACY FUNCTIONS (kept for compatibility) ─────────────────────────────────

// // export async function saveInterviewAnswer(
// //   interviewId: string,
// //   questionIndex: number,
// //   questionText: string,
// //   questionCategory: string,
// //   userAnswer: string,
// //   transcript?: string
// // ): Promise<void> {
// //   if (!supabase) throw new Error('Supabase client not initialized');
// //   const { error } = await supabase
// //     .from('interview_answers')
// //     .upsert({
// //       interview_id: interviewId,
// //       question_index: questionIndex,
// //       question_text: questionText,
// //       question_category: questionCategory,
// //       user_answer: userAnswer,
// //       transcript: transcript || userAnswer,
// //       score: null,
// //       feedback: null,
// //       strengths: [],
// //       improvements: [],
// //     }, { onConflict: 'interview_id,question_index' });
// //   if (error) console.error('saveInterviewAnswer error (non-fatal):', error);
// // }

// // export async function evaluateAnswer(
// //   question: string,
// //   category: string,
// //   answer: string,
// //   jobRole: string,
// //   difficulty: string
// // ): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[] }> {
// //   try {
// //     const response = await fetch('/api/evaluate-answer', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ question, category, answer, jobRole, difficulty }),
// //     });
// //     if (!response.ok) throw new Error('Failed');
// //     return await response.json();
// //   } catch {
// //     return { score: 50, feedback: 'Unable to evaluate.', strengths: ['Answer provided'], improvements: ['Add more detail'] };
// //   }
// // }

// // export async function updateAnswerEvaluation(
// //   interviewId: string,
// //   questionIndex: number,
// //   evaluation: { score: number; feedback: string; strengths: string[]; improvements: string[] }
// // ): Promise<void> {
// //   if (!supabase) return;
// //   await supabase
// //     .from('interview_answers')
// //     .update(evaluation)
// //     .eq('interview_id', interviewId)
// //     .eq('question_index', questionIndex);
// // }

// // export async function completeInterview(interviewId: string): Promise<void> {
// //   if (!supabase) return;
// //   await supabase
// //     .from('interviews')
// //     .update({ status: 'completed', completed_at: new Date().toISOString() })
// //     .eq('id', interviewId);
// // }

// // export async function getInterviewResults(interviewId: string): Promise<InterviewResult | null> {
// //   if (!supabase) throw new Error('Supabase client not initialized');

// //   try {
// //     const { data: interview, error } = await supabase
// //       .from('interviews')
// //       .select('*')
// //       .eq('id', interviewId)
// //       .single();

// //     if (error) throw error;
// //     if (!interview) return null;

// //     const { data: answers } = await supabase
// //       .from('interview_answers')
// //       .select('*')
// //       .eq('interview_id', interviewId)
// //       .order('question_index', { ascending: true });

// //     const formattedInterview = {
// //       id: interview.id,
// //       userId: interview.user_id,
// //       jobRole: interview.job_role,
// //       company: interview.company,
// //       interviewType: interview.interview_type,
// //       difficulty: interview.difficulty,
// //       questions: interview.questions,
// //       status: interview.status,
// //       score: interview.score,
// //       feedback: interview.feedback,
// //       overall_feedback: interview.overall_feedback,
// //       strengths: interview.strengths || [],
// //       improvements: interview.improvements || [],
// //       category_results: interview.category_results || [],
// //       hiring_recommendation: interview.hiring_recommendation || '',
// //       conversation_json: interview.conversation_json || [],
// //       createdAt: new Date(interview.created_at),
// //       completedAt: interview.completed_at ? new Date(interview.completed_at) : undefined,
// //     } as any;

// //     const formattedAnswers: InterviewAnswer[] = (answers || []).map(a => ({
// //       id: a.id,
// //       interview_id: a.interview_id,
// //       question_index: a.question_index,
// //       question_text: a.question_text,
// //       question_category: a.question_category,
// //       user_answer: a.user_answer,
// //       transcript: a.transcript,
// //       audio_url: a.audio_url,
// //       score: a.score,
// //       feedback: a.feedback,
// //       strengths: a.strengths || [],
// //       improvements: a.improvements || [],
// //       created_at: new Date(a.created_at),
// //     }));

// //     return { interview: formattedInterview, answers: formattedAnswers };
// //   } catch (error) {
// //     console.error('Error getting results:', error);
// //     return null;
// //   }
// // }






// import { supabase } from './supabase';
// import { InterviewAnswer, Interview, InterviewResult } from '@/types';

// interface ConversationMessage {
//   role: 'user' | 'assistant';
//   content: string;
// }

// /**
//  * Direct evaluation — no conversation stored in DB
//  * Calls Claude API immediately, saves only the results
//  */
// export async function evaluateAndComplete(
//   interviewId: string,
//   conversation: ConversationMessage[],
//   interviewType: string,
//   jobRole: string,
//   difficulty: string
// ): Promise<void> {
//   if (!supabase) throw new Error('Supabase client not initialized');

//   // Filter noise
//   const cleaned = conversation.filter(m => m.content && m.content.trim().length > 2);
//   console.log(`🤖 Sending ${cleaned.length} messages directly to Claude...`);

//   let score = 60;
//   let overallFeedback = 'Interview completed.';
//   let strengths: string[] = ['Completed the interview'];
//   let improvements: string[] = ['Practice regularly'];
//   let categoryResults: any[] = [];
//   let hiringRecommendation = 'Maybe';

//   try {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 30000);

//     const response = await fetch('/api/evaluate-answer', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ conversation: cleaned, interviewType, jobRole, difficulty }),
//       signal: controller.signal,
//     });

//     clearTimeout(timeoutId);

//     if (response.ok) {
//       const result = await response.json();
//       score = result.overallScore;
//       overallFeedback = result.overallFeedback;
//       strengths = result.strengths;
//       improvements = result.improvements;
//       categoryResults = result.categories;
//       hiringRecommendation = result.hiringRecommendation;
//       console.log(`✅ Claude evaluation done: ${score}/100 — ${hiringRecommendation}`);
//     }
//   } catch (e: any) {
//     console.error('Claude evaluation error (using defaults):', e?.name === 'AbortError' ? 'timeout' : e);
//   }

//   // Save ONLY the results (small payload) — not the conversation
//   try {
//     const { error } = await supabase
//       .from('interviews')
//       .update({
//         status: 'completed',
//         score,
//         completed_at: new Date().toISOString(),
//         overall_feedback: overallFeedback,
//         strengths,
//         improvements,
//         category_results: categoryResults,
//         hiring_recommendation: hiringRecommendation,
//       })
//       .eq('id', interviewId);

//     if (error) {
//       // Retry without optional columns
//       await supabase
//         .from('interviews')
//         .update({
//           status: 'completed',
//           score,
//           completed_at: new Date().toISOString(),
//           overall_feedback: overallFeedback,
//           strengths,
//           improvements,
//         })
//         .eq('id', interviewId);
//     }
//     console.log('✅ Results saved to DB');
//   } catch (dbErr) {
//     console.error('DB save failed:', dbErr);
//   }
// }

// /**
//  * STEP 2 (results page): Read conversation JSON from DB, send to Groq, save results
//  */
// export async function evaluateAndSaveResults(
//   interviewId: string,
//   conversation: ConversationMessage[],
//   interviewType: string,
//   jobRole: string,
//   difficulty: string
// ): Promise<{
//   overallScore: number;
//   overallFeedback: string;
//   categories: { name: string; score: number; feedback: string; strengths: string[]; improvements: string[] }[];
//   strengths: string[];
//   improvements: string[];
//   hiringRecommendation: string;
// }> {
//   if (!supabase) throw new Error('Supabase client not initialized');

//   // Filter out very short/empty messages only — no artificial limit
//   // JSON is compact so full conversation is fine for Groq's 32k token limit
//   const trimmed = conversation
//     .filter(m => m.content && m.content.trim().length > 2);

//   console.log(`🤖 Sending ${trimmed.length} messages to Claude for evaluation...`);

//   const defaultResult = {
//     overallScore: 60,
//     overallFeedback: 'Interview completed. Your conversation has been recorded and evaluated.',
//     categories: [],
//     strengths: ['Completed the interview', 'Engaged with the AI interviewer'],
//     improvements: ['Practice more regularly', 'Add specific examples to your answers'],
//     hiringRecommendation: 'Maybe',
//   };

//   let result = defaultResult;

//   try {
//     // Call Groq with a 25s timeout
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 25000);

//     const response = await fetch('/api/evaluate-answer', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         conversation: trimmed,
//         interviewType,
//         jobRole,
//         difficulty,
//       }),
//       signal: controller.signal,
//     });

//     clearTimeout(timeoutId);

//     if (response.ok) {
//       result = await response.json();
//       console.log(`✅ Claude evaluation done: ${result.overallScore}/100`);
//     } else {
//       console.error('Groq API error:', response.status);
//     }
//   } catch (e: any) {
//     if (e?.name === 'AbortError') {
//       console.error('⏱️ Groq timed out — using default scores');
//     } else {
//       console.error('Groq evaluation failed:', e);
//     }
//   }

//   // Save results back to DB
//   console.log('💾 Saving Groq results to DB...');
//   try {
//     const { error } = await supabase
//       .from('interviews')
//       .update({
//         status: 'completed',
//         score: result.overallScore,
//         overall_feedback: result.overallFeedback,
//         strengths: result.strengths,
//         improvements: result.improvements,
//         category_results: result.categories,
//         hiring_recommendation: result.hiringRecommendation,
//       })
//       .eq('id', interviewId);

//     if (error) {
//       // Retry without optional columns if they don't exist yet
//       console.warn('Retrying without optional columns...');
//       await supabase
//         .from('interviews')
//         .update({
//           status: 'completed',
//           score: result.overallScore,
//           overall_feedback: result.overallFeedback,
//           strengths: result.strengths,
//           improvements: result.improvements,
//         })
//         .eq('id', interviewId);
//     }
//   } catch (dbError) {
//     console.error('DB save failed:', dbError);
//   }

//   return result;
// }

// // ── LEGACY FUNCTIONS (kept for compatibility) ─────────────────────────────────

// export async function saveInterviewAnswer(
//   interviewId: string,
//   questionIndex: number,
//   questionText: string,
//   questionCategory: string,
//   userAnswer: string,
//   transcript?: string
// ): Promise<void> {
//   if (!supabase) throw new Error('Supabase client not initialized');
//   const { error } = await supabase
//     .from('interview_answers')
//     .upsert({
//       interview_id: interviewId,
//       question_index: questionIndex,
//       question_text: questionText,
//       question_category: questionCategory,
//       user_answer: userAnswer,
//       transcript: transcript || userAnswer,
//       score: null,
//       feedback: null,
//       strengths: [],
//       improvements: [],
//     }, { onConflict: 'interview_id,question_index' });
//   if (error) console.error('saveInterviewAnswer error (non-fatal):', error);
// }

// export async function evaluateAnswer(
//   question: string,
//   category: string,
//   answer: string,
//   jobRole: string,
//   difficulty: string
// ): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[] }> {
//   try {
//     const response = await fetch('/api/evaluate-answer', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ question, category, answer, jobRole, difficulty }),
//     });
//     if (!response.ok) throw new Error('Failed');
//     return await response.json();
//   } catch {
//     return { score: 50, feedback: 'Unable to evaluate.', strengths: ['Answer provided'], improvements: ['Add more detail'] };
//   }
// }

// export async function updateAnswerEvaluation(
//   interviewId: string,
//   questionIndex: number,
//   evaluation: { score: number; feedback: string; strengths: string[]; improvements: string[] }
// ): Promise<void> {
//   if (!supabase) return;
//   await supabase
//     .from('interview_answers')
//     .update(evaluation)
//     .eq('interview_id', interviewId)
//     .eq('question_index', questionIndex);
// }

// export async function completeInterview(interviewId: string): Promise<void> {
//   if (!supabase) return;
//   await supabase
//     .from('interviews')
//     .update({ status: 'completed', completed_at: new Date().toISOString() })
//     .eq('id', interviewId);
// }

// export async function getInterviewResults(interviewId: string): Promise<InterviewResult | null> {
//   if (!supabase) throw new Error('Supabase client not initialized');

//   try {
//     const { data: interview, error } = await supabase
//       .from('interviews')
//       .select('*')
//       .eq('id', interviewId)
//       .single();

//     if (error) throw error;
//     if (!interview) return null;

//     const { data: answers } = await supabase
//       .from('interview_answers')
//       .select('*')
//       .eq('interview_id', interviewId)
//       .order('question_index', { ascending: true });

//     const formattedInterview = {
//       id: interview.id,
//       userId: interview.user_id,
//       jobRole: interview.job_role,
//       company: interview.company,
//       interviewType: interview.interview_type,
//       difficulty: interview.difficulty,
//       questions: interview.questions,
//       status: interview.status,
//       score: interview.score,
//       feedback: interview.feedback,
//       overall_feedback: interview.overall_feedback,
//       strengths: interview.strengths || [],
//       improvements: interview.improvements || [],
//       category_results: interview.category_results || [],
//       hiring_recommendation: interview.hiring_recommendation || '',
//       conversation_json: interview.conversation_json || [],
//       createdAt: new Date(interview.created_at),
//       completedAt: interview.completed_at ? new Date(interview.completed_at) : undefined,
//     } as any;

//     const formattedAnswers: InterviewAnswer[] = (answers || []).map(a => ({
//       id: a.id,
//       interview_id: a.interview_id,
//       question_index: a.question_index,
//       question_text: a.question_text,
//       question_category: a.question_category,
//       user_answer: a.user_answer,
//       transcript: a.transcript,
//       audio_url: a.audio_url,
//       score: a.score,
//       feedback: a.feedback,
//       strengths: a.strengths || [],
//       improvements: a.improvements || [],
//       created_at: new Date(a.created_at),
//     }));

//     return { interview: formattedInterview, answers: formattedAnswers };
//   } catch (error) {
//     console.error('Error getting results:', error);
//     return null;
//   }
// }



import { supabase } from './supabase';
import { InterviewAnswer, Interview, InterviewResult } from '@/types';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Direct evaluation — no conversation stored in DB
 * Calls Claude API immediately, saves only the results
 */
export async function evaluateAndComplete(
  interviewId: string,
  conversation: ConversationMessage[],
  interviewType: string,
  jobRole: string,
  difficulty: string
): Promise<void> {
  if (!supabase) throw new Error('Supabase client not initialized');

  // Filter noise + hard cap at 40 messages to stay within Groq token limit
  const cleaned = conversation
    .filter(m => m.content && m.content.trim().length > 5)
    .slice(-40);
  console.log(`🤖 Sending ${cleaned.length} messages directly to Claude...`);

  let score = 60;
  let overallFeedback = 'Interview completed.';
  let strengths: string[] = ['Completed the interview'];
  let improvements: string[] = ['Practice regularly'];
  let categoryResults: any[] = [];
  let hiringRecommendation = 'Maybe';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch('/api/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation: cleaned, interviewType, jobRole, difficulty }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      score = result.overallScore;
      overallFeedback = result.overallFeedback;
      strengths = result.strengths;
      improvements = result.improvements;
      categoryResults = result.categories;
      hiringRecommendation = result.hiringRecommendation;
      console.log(`✅ Claude evaluation done: ${score}/100 — ${hiringRecommendation}`);
    }
  } catch (e: any) {
    console.error('Claude evaluation error (using defaults):', e?.name === 'AbortError' ? 'timeout' : e);
  }

  // Save ONLY the results (small payload) — not the conversation
  try {
    const { error } = await supabase
      .from('interviews')
      .update({
        status: 'completed',
        score,
        completed_at: new Date().toISOString(),
        overall_feedback: overallFeedback,
        strengths,
        improvements,
        category_results: categoryResults,
        hiring_recommendation: hiringRecommendation,
      })
      .eq('id', interviewId);

    if (error) {
      // Retry without optional columns
      await supabase
        .from('interviews')
        .update({
          status: 'completed',
          score,
          completed_at: new Date().toISOString(),
          overall_feedback: overallFeedback,
          strengths,
          improvements,
        })
        .eq('id', interviewId);
    }
    console.log('✅ Results saved to DB');
  } catch (dbErr) {
    console.error('DB save failed:', dbErr);
  }
}

/**
 * STEP 2 (results page): Read conversation JSON from DB, send to Groq, save results
 */
export async function evaluateAndSaveResults(
  interviewId: string,
  conversation: ConversationMessage[],
  interviewType: string,
  jobRole: string,
  difficulty: string
): Promise<{
  overallScore: number;
  overallFeedback: string;
  categories: { name: string; score: number; feedback: string; strengths: string[]; improvements: string[] }[];
  strengths: string[];
  improvements: string[];
  hiringRecommendation: string;
}> {
  if (!supabase) throw new Error('Supabase client not initialized');

  // Filter out very short/empty messages only — no artificial limit
  // JSON is compact so full conversation is fine for Groq's 32k token limit
  const trimmed = conversation
    .filter(m => m.content && m.content.trim().length > 2);

  console.log(`🤖 Sending ${trimmed.length} messages to Claude for evaluation...`);

  const defaultResult = {
    overallScore: 60,
    overallFeedback: 'Interview completed. Your conversation has been recorded and evaluated.',
    categories: [],
    strengths: ['Completed the interview', 'Engaged with the AI interviewer'],
    improvements: ['Practice more regularly', 'Add specific examples to your answers'],
    hiringRecommendation: 'Maybe',
  };

  let result = defaultResult;

  try {
    // Call Groq with a 25s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch('/api/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversation: trimmed,
        interviewType,
        jobRole,
        difficulty,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      result = await response.json();
      console.log(`✅ Claude evaluation done: ${result.overallScore}/100`);
    } else {
      console.error('Groq API error:', response.status);
    }
  } catch (e: any) {
    if (e?.name === 'AbortError') {
      console.error('⏱️ Groq timed out — using default scores');
    } else {
      console.error('Groq evaluation failed:', e);
    }
  }

  // Save results back to DB
  console.log('💾 Saving Groq results to DB...');
  try {
    const { error } = await supabase
      .from('interviews')
      .update({
        status: 'completed',
        score: result.overallScore,
        overall_feedback: result.overallFeedback,
        strengths: result.strengths,
        improvements: result.improvements,
        category_results: result.categories,
        hiring_recommendation: result.hiringRecommendation,
      })
      .eq('id', interviewId);

    if (error) {
      // Retry without optional columns if they don't exist yet
      console.warn('Retrying without optional columns...');
      await supabase
        .from('interviews')
        .update({
          status: 'completed',
          score: result.overallScore,
          overall_feedback: result.overallFeedback,
          strengths: result.strengths,
          improvements: result.improvements,
        })
        .eq('id', interviewId);
    }
  } catch (dbError) {
    console.error('DB save failed:', dbError);
  }

  return result;
}

// ── LEGACY FUNCTIONS (kept for compatibility) ─────────────────────────────────

export async function saveInterviewAnswer(
  interviewId: string,
  questionIndex: number,
  questionText: string,
  questionCategory: string,
  userAnswer: string,
  transcript?: string
): Promise<void> {
  if (!supabase) throw new Error('Supabase client not initialized');
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
    }, { onConflict: 'interview_id,question_index' });
  if (error) console.error('saveInterviewAnswer error (non-fatal):', error);
}

export async function evaluateAnswer(
  question: string,
  category: string,
  answer: string,
  jobRole: string,
  difficulty: string
): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[] }> {
  try {
    const response = await fetch('/api/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, category, answer, jobRole, difficulty }),
    });
    if (!response.ok) throw new Error('Failed');
    return await response.json();
  } catch {
    return { score: 50, feedback: 'Unable to evaluate.', strengths: ['Answer provided'], improvements: ['Add more detail'] };
  }
}

export async function updateAnswerEvaluation(
  interviewId: string,
  questionIndex: number,
  evaluation: { score: number; feedback: string; strengths: string[]; improvements: string[] }
): Promise<void> {
  if (!supabase) return;
  await supabase
    .from('interview_answers')
    .update(evaluation)
    .eq('interview_id', interviewId)
    .eq('question_index', questionIndex);
}

export async function completeInterview(interviewId: string): Promise<void> {
  if (!supabase) return;
  await supabase
    .from('interviews')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('id', interviewId);
}

export async function getInterviewResults(interviewId: string): Promise<InterviewResult | null> {
  if (!supabase) throw new Error('Supabase client not initialized');

  try {
    const { data: interview, error } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .single();

    if (error) throw error;
    if (!interview) return null;

    const { data: answers } = await supabase
      .from('interview_answers')
      .select('*')
      .eq('interview_id', interviewId)
      .order('question_index', { ascending: true });

    const formattedInterview = {
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
      category_results: interview.category_results || [],
      hiring_recommendation: interview.hiring_recommendation || '',
      conversation_json: interview.conversation_json || [],
      createdAt: new Date(interview.created_at),
      completedAt: interview.completed_at ? new Date(interview.completed_at) : undefined,
    } as any;

    const formattedAnswers: InterviewAnswer[] = (answers || []).map(a => ({
      id: a.id,
      interview_id: a.interview_id,
      question_index: a.question_index,
      question_text: a.question_text,
      question_category: a.question_category,
      user_answer: a.user_answer,
      transcript: a.transcript,
      audio_url: a.audio_url,
      score: a.score,
      feedback: a.feedback,
      strengths: a.strengths || [],
      improvements: a.improvements || [],
      created_at: new Date(a.created_at),
    }));

    return { interview: formattedInterview, answers: formattedAnswers };
  } catch (error) {
    console.error('Error getting results:', error);
    return null;
  }
}