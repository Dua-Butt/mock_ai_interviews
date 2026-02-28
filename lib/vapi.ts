'use client';

import Vapi from '@vapi-ai/web';

// Initialize Vapi client
let vapiInstance: Vapi | null = null;

export const getVapiClient = () => {
  if (!vapiInstance && typeof window !== 'undefined') {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
    if (!publicKey) {
      console.error('NEXT_PUBLIC_VAPI_WEB_TOKEN is not set in environment variables');
      return null;
    }
    vapiInstance = new Vapi(publicKey);
  }
  return vapiInstance;
};

export interface InterviewAssistantConfig {
  jobRole: string;
  company?: string;
  interviewType: 'technical' | 'behavioral' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
  currentQuestion: string;
  questionCategory: string;
  questions?: { question: string; category: string }[];
  questionCount?: number;
}

export const createInterviewAssistant = (config: InterviewAssistantConfig) => {
  // Use numberOfQuestions from config — exactly what user set on create page
  const totalQuestions = config.questionCount || config.questions?.length || 3;

  // Build numbered question list for the prompt
  const questionsList = config.questions && config.questions.length > 0
    ? config.questions
        .slice(0, totalQuestions) // only use exactly totalQuestions
        .map((q, i) => `Question ${i + 1} of ${totalQuestions}: ${q.question}`)
        .join('\n')
    : `Question 1 of ${totalQuestions}: ${config.currentQuestion}`;

  const firstQuestion = config.questions?.[0]?.question || config.currentQuestion;

  return {
    name: `AI Interview - ${config.jobRole}`,
    transcriber: {
      provider: 'deepgram' as const,
      model: 'nova-2' as const,
      language: 'en-US' as const,
    },
    voice: {
      provider: '11labs' as const,
      voiceId: 'sarah' as const,
    },
    model: {
      provider: 'openai' as const,
      model: 'gpt-4o' as const,
      temperature: 0.7,
      messages: [
        {
          role: 'system' as const,
          content: `You are a professional interviewer conducting a ${config.difficulty} level ${config.interviewType} interview for the ${config.jobRole} position${config.company ? ` at ${config.company}` : ''}.

THIS INTERVIEW HAS EXACTLY ${totalQuestions} QUESTIONS.

STRICT RULES — follow without exception:
1. Ask EXACTLY ${totalQuestions} questions — not more, not fewer.
2. Use ONLY the questions listed below, in exact order.
3. Before each question, say "Question [number] of ${totalQuestions}:" so the candidate knows their progress.
4. Ask ONE question at a time. Wait for the candidate's complete answer.
5. After each answer, give a brief 1-sentence acknowledgment, then move to the next question.
6. Do NOT ask follow-up questions. Do NOT improvise new questions.
7. After the candidate answers Question ${totalQuestions}, say:
   "That was Question ${totalQuestions} of ${totalQuestions} — you've completed all the questions! Feel free to say goodbye when you're ready."
8. Do NOT end the call yourself — always wait for the candidate to say goodbye.
9. Be patient — silence for up to 30 seconds is okay.

YOUR ${totalQuestions} QUESTIONS:
${questionsList}

Style: Professional, warm, concise (30-50 words per response max).`,
        },
      ],
    },
    firstMessage: `Hello! Welcome to your ${config.interviewType} interview for the ${config.jobRole} position${config.company ? ` at ${config.company}` : ''}. I'll be asking you ${totalQuestions} question${totalQuestions > 1 ? 's' : ''} today. Take your time with each answer.\n\nLet's begin with Question 1 of ${totalQuestions}:\n\n${firstQuestion}`,
    recordingEnabled: true,
    endCallMessage: 'Thank you for your time. Best of luck!',
    maxDurationSeconds: 1800,
    silenceTimeoutSeconds: 30,
  } as const;
};

export const startInterviewCall = async (config: InterviewAssistantConfig) => {
  const vapi = getVapiClient();
  if (!vapi) throw new Error('Vapi client not initialized');

  const assistant = createInterviewAssistant(config);

  try {
    await vapi.start(assistant as any);
    return vapi;
  } catch (error) {
    console.error('Failed to start Vapi call:', error);
    throw error;
  }
};

export const stopInterviewCall = async () => {
  const vapi = getVapiClient();
  if (!vapi) throw new Error('Vapi client not initialized');

  try {
    await vapi.stop();
  } catch (error) {
    console.error('Failed to stop Vapi call:', error);
    throw error;
  }
};

export type VapiEvent =
  | { type: 'call-start' }
  | { type: 'call-end' }
  | { type: 'speech-start' }
  | { type: 'speech-end' }
  | { type: 'message'; message: { role: string; content: string } }
  | { type: 'error'; error: Error };