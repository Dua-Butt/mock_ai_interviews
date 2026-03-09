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

//   // Filter noise + hard cap at 40 messages to stay within Groq token limit
//   const cleaned = conversation
//     .filter(m => m.content && m.content.trim().length > 5)
//     .slice(-40);
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

  const trimmed = conversation.filter(m => m.content && m.content.trim().length > 2);
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000);

    const response = await fetch('/api/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation: trimmed, interviewType, jobRole, difficulty }),
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

// ── LEGACY FUNCTIONS ──────────────────────────────────────────────────────────

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

  // ✅ FIX: Always verify session before any DB query
  // This prevents the empty error {} when called before auth is ready
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    console.warn('getInterviewResults: no active session — aborting');
    return null;
  }

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