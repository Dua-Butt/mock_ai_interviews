// // // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // // export const runtime = 'edge';

// // // // // // interface EvaluateAnswerRequest {
// // // // // //   question: string;
// // // // // //   category: string;
// // // // // //   answer: string;
// // // // // //   jobRole: string;
// // // // // //   difficulty: string;
// // // // // // }

// // // // // // export async function POST(request: NextRequest) {
// // // // // //   try {
// // // // // //     const body: EvaluateAnswerRequest = await request.json();
// // // // // //     const { question, category, answer, jobRole, difficulty } = body;

// // // // // //     // Validate input
// // // // // //     if (!question || !answer || !jobRole || !difficulty) {
// // // // // //       return NextResponse.json(
// // // // // //         { error: 'Missing required fields' },
// // // // // //         { status: 400 }
// // // // // //       );
// // // // // //     }

// // // // // //     const prompt = `You are an expert technical interviewer evaluating a candidate's answer for a ${jobRole} position.

// // // // // // Interview Details:
// // // // // // - Question Category: ${category}
// // // // // // - Difficulty Level: ${difficulty}
// // // // // // - Question: ${question}
// // // // // // - Candidate's Answer: ${answer}

// // // // // // Evaluate this answer and provide:
// // // // // // 1. A score from 0-100 (be realistic and fair)
// // // // // // 2. Detailed feedback (2-3 sentences explaining the score)
// // // // // // 3. 2-3 key strengths in the answer
// // // // // // 4. 2-3 specific areas for improvement

// // // // // // Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no extra text):
// // // // // // {
// // // // // //   "score": <number between 0-100>,
// // // // // //   "feedback": "<detailed 2-3 sentence feedback>",
// // // // // //   "strengths": ["<specific strength 1>", "<specific strength 2>"],
// // // // // //   "improvements": ["<specific improvement 1>", "<specific improvement 2>"]
// // // // // // }`;

// // // // // //     console.log('Evaluating answer with Grok AI...');

// // // // // //     // Call Grok API
// // // // // //     const response = await fetch('https://api.x.ai/v1/chat/completions', {
// // // // // //       method: 'POST',
// // // // // //       headers: {
// // // // // //         'Content-Type': 'application/json',
// // // // // //         'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
// // // // // //       },
// // // // // //       body: JSON.stringify({
// // // // // //         model: 'grok-beta',
// // // // // //         messages: [
// // // // // //           {
// // // // // //             role: 'system',
// // // // // //             content: 'You are an expert interviewer. Evaluate answers fairly and provide constructive feedback. Respond ONLY with valid JSON, no markdown, no explanations.'
// // // // // //           },
// // // // // //           {
// // // // // //             role: 'user',
// // // // // //             content: prompt
// // // // // //           }
// // // // // //         ],
// // // // // //         temperature: 0.5,
// // // // // //         max_tokens: 800
// // // // // //       })
// // // // // //     });

// // // // // //     if (!response.ok) {
// // // // // //       const errorText = await response.text();
// // // // // //       console.error('Grok API Error:', response.status, errorText);
// // // // // //       throw new Error(`Grok API error: ${response.status}`);
// // // // // //     }

// // // // // //     const data = await response.json();
// // // // // //     const aiResponse = data.choices[0].message.content;

// // // // // //     console.log('Grok AI Response:', aiResponse);

// // // // // //     // Parse the response
// // // // // //     let evaluation;
// // // // // //     try {
// // // // // //       // Remove markdown code blocks if present
// // // // // //       const cleanedText = aiResponse
// // // // // //         .replace(/```json\n?/g, '')
// // // // // //         .replace(/```\n?/g, '')
// // // // // //         .trim();

// // // // // //       evaluation = JSON.parse(cleanedText);
// // // // // //     } catch (parseError) {
// // // // // //       console.error('Failed to parse Grok response:', parseError);

// // // // // //       // Fallback: try to extract JSON from the text
// // // // // //       const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
// // // // // //       if (jsonMatch) {
// // // // // //         evaluation = JSON.parse(jsonMatch[0]);
// // // // // //       } else {
// // // // // //         // Return default evaluation if parsing fails
// // // // // //         evaluation = {
// // // // // //           score: 60,
// // // // // //           feedback: 'Your answer was recorded. The evaluation system encountered an issue, but your response shows effort and understanding.',
// // // // // //           strengths: ['Answer provided', 'Demonstrated engagement'],
// // // // // //           improvements: ['Try to be more specific', 'Provide concrete examples']
// // // // // //         };
// // // // // //       }
// // // // // //     }

// // // // // //     // Validate and sanitize the evaluation
// // // // // //     if (typeof evaluation.score !== 'number') {
// // // // // //       evaluation.score = 60;
// // // // // //     }

// // // // // //     evaluation.score = Math.max(0, Math.min(100, Math.round(evaluation.score)));

// // // // // //     if (!evaluation.feedback || typeof evaluation.feedback !== 'string') {
// // // // // //       evaluation.feedback = 'Good effort. Continue practicing to improve your interview skills.';
// // // // // //     }

// // // // // //     if (!Array.isArray(evaluation.strengths)) {
// // // // // //       evaluation.strengths = ['Answer recorded'];
// // // // // //     }

// // // // // //     if (!Array.isArray(evaluation.improvements)) {
// // // // // //       evaluation.improvements = ['Practice more complex scenarios'];
// // // // // //     }

// // // // // //     console.log(`✅ Successfully evaluated answer: ${evaluation.score}/100`);

// // // // // //     return NextResponse.json(evaluation, { status: 200 });

// // // // // //   } catch (error: any) {
// // // // // //     console.error('Error evaluating answer:', error);

// // // // // //     // Return a default evaluation on error so interview can continue
// // // // // //     return NextResponse.json(
// // // // // //       {
// // // // // //         score: 60,
// // // // // //         feedback: 'Your answer has been recorded. Due to a technical issue, we provided a default evaluation. Your response showed effort and understanding.',
// // // // // //         strengths: ['Answer provided', 'Engaged with the question'],
// // // // // //         improvements: ['Review the question requirements', 'Practice similar scenarios']
// // // // // //       },
// // // // // //       { status: 200 }
// // // // // //     );
// // // // // //   }
// // // // // // }





// // // // // import { NextRequest, NextResponse } from 'next/server';

// // // // // export const runtime = 'edge';

// // // // // interface EvaluateAnswerRequest {
// // // // //   question: string;
// // // // //   category: string;
// // // // //   answer: string;
// // // // //   jobRole: string;
// // // // //   difficulty: string;
// // // // // }

// // // // // export async function POST(request: NextRequest) {
// // // // //   try {
// // // // //     const body: EvaluateAnswerRequest = await request.json();
// // // // //     const { question, category, answer, jobRole, difficulty } = body;

// // // // //     console.log('📊 Evaluating answer:', { question: question.substring(0, 50), answerLength: answer.length });

// // // // //     // Validate input
// // // // //     if (!question || !answer || !jobRole || !difficulty) {
// // // // //       return NextResponse.json(
// // // // //         { error: 'Missing required fields' },
// // // // //         { status: 400 }
// // // // //       );
// // // // //     }

// // // // //     // Check for Groq API key
// // // // //     const apiKey = process.env.GROQ_API_KEY;

// // // // //     if (!apiKey) {
// // // // //       console.error('❌ GROQ_API_KEY not found - returning default evaluation');
// // // // //       return getDefaultEvaluation();
// // // // //     }

// // // // //     const systemPrompt = 'You are an expert technical interviewer evaluating candidates fairly and constructively. Respond ONLY with valid JSON. No markdown. No code blocks. No explanations outside the JSON.';

// // // // //     const userPrompt = `Evaluate this interview answer for a ${jobRole} position.

// // // // // Interview Details:
// // // // // - Question Category: ${category}
// // // // // - Difficulty Level: ${difficulty}
// // // // // - Question: ${question}
// // // // // - Candidate's Answer: ${answer}

// // // // // Provide a fair, constructive evaluation with:
// // // // // 1. Score (0-100): Be realistic. 70+ for good answers, 80+ for excellent, 90+ for outstanding
// // // // // 2. Feedback: 2-3 sentences explaining the score
// // // // // 3. Strengths: 2-3 specific positive aspects of the answer
// // // // // 4. Improvements: 2-3 specific, actionable suggestions

// // // // // OUTPUT FORMAT (strict JSON only):
// // // // // {
// // // // //   "score": <number 0-100>,
// // // // //   "feedback": "<2-3 sentence evaluation>",
// // // // //   "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
// // // // //   "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
// // // // // }

// // // // // Return ONLY the JSON object. No markdown. No code blocks.`;

// // // // //     console.log('🤖 Calling Groq AI for evaluation...');

// // // // //     // Call Groq AI API
// // // // //     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
// // // // //       method: 'POST',
// // // // //       headers: {
// // // // //         'Content-Type': 'application/json',
// // // // //         'Authorization': `Bearer ${apiKey}`,
// // // // //       },
// // // // //       body: JSON.stringify({
// // // // //         model: 'llama-3.3-70b-versatile',
// // // // //         messages: [
// // // // //           {
// // // // //             role: 'system',
// // // // //             content: systemPrompt
// // // // //           },
// // // // //           {
// // // // //             role: 'user',
// // // // //             content: userPrompt
// // // // //           }
// // // // //         ],
// // // // //         temperature: 0.5,
// // // // //         max_tokens: 1000,
// // // // //         top_p: 1,
// // // // //         stream: false
// // // // //       })
// // // // //     });

// // // // //     console.log('📡 Groq API Response Status:', response.status);

// // // // //     if (!response.ok) {
// // // // //       const errorText = await response.text();
// // // // //       console.error('❌ Groq API Error:', response.status, errorText);
// // // // //       return getDefaultEvaluation();
// // // // //     }

// // // // //     const data = await response.json();
// // // // //     const aiResponse = data.choices?.[0]?.message?.content;

// // // // //     if (!aiResponse) {
// // // // //       console.error('❌ No content in AI response');
// // // // //       return getDefaultEvaluation();
// // // // //     }

// // // // //     console.log('📝 Raw AI Response:', aiResponse.substring(0, 300));

// // // // //     // Parse the response
// // // // //     let evaluation;
// // // // //     try {
// // // // //       // Clean the response
// // // // //       let cleanedText = aiResponse.trim();

// // // // //       // Remove markdown code blocks
// // // // //       cleanedText = cleanedText.replace(/```json\s*/g, '');
// // // // //       cleanedText = cleanedText.replace(/```\s*/g, '');

// // // // //       // Find JSON object
// // // // //       const jsonStart = cleanedText.indexOf('{');
// // // // //       const jsonEnd = cleanedText.lastIndexOf('}') + 1;

// // // // //       if (jsonStart !== -1 && jsonEnd > jsonStart) {
// // // // //         cleanedText = cleanedText.substring(jsonStart, jsonEnd);
// // // // //       }

// // // // //       console.log('🧹 Cleaned JSON:', cleanedText.substring(0, 200));

// // // // //       evaluation = JSON.parse(cleanedText);
// // // // //       console.log('✅ Successfully parsed evaluation JSON');

// // // // //     } catch (parseError: any) {
// // // // //       console.error('❌ Failed to parse AI response:', parseError.message);
// // // // //       console.error('Text that failed:', aiResponse.substring(0, 500));
// // // // //       return getDefaultEvaluation();
// // // // //     }

// // // // //     // Validate and sanitize the evaluation
// // // // //     const validatedEvaluation = {
// // // // //       score: validateScore(evaluation.score),
// // // // //       feedback: validateFeedback(evaluation.feedback),
// // // // //       strengths: validateArray(evaluation.strengths, 'strengths'),
// // // // //       improvements: validateArray(evaluation.improvements, 'improvements')
// // // // //     };

// // // // //     console.log(`✅ Successfully evaluated answer: ${validatedEvaluation.score}/100`);
// // // // //     console.log('Feedback:', validatedEvaluation.feedback.substring(0, 100));

// // // // //     return NextResponse.json(validatedEvaluation, { status: 200 });

// // // // //   } catch (error: any) {
// // // // //     console.error('❌ Error evaluating answer:', error.message);
// // // // //     return getDefaultEvaluation();
// // // // //   }
// // // // // }

// // // // // // Helper function to validate score
// // // // // function validateScore(score: any): number {
// // // // //   if (typeof score !== 'number' || isNaN(score)) {
// // // // //     console.warn('Invalid score, using default: 65');
// // // // //     return 65;
// // // // //   }

// // // // //   // Ensure score is between 0-100
// // // // //   const validScore = Math.max(0, Math.min(100, Math.round(score)));
// // // // //   console.log('Validated score:', validScore);
// // // // //   return validScore;
// // // // // }

// // // // // // Helper function to validate feedback
// // // // // function validateFeedback(feedback: any): string {
// // // // //   if (typeof feedback !== 'string' || feedback.trim().length === 0) {
// // // // //     console.warn('Invalid feedback, using default');
// // // // //     return 'Your answer demonstrates understanding of the topic. Continue practicing to refine your explanations and add more specific examples.';
// // // // //   }

// // // // //   return feedback.trim();
// // // // // }

// // // // // // Helper function to validate arrays
// // // // // function validateArray(arr: any, type: 'strengths' | 'improvements'): string[] {
// // // // //   if (!Array.isArray(arr) || arr.length === 0) {
// // // // //     console.warn(`Invalid ${type}, using defaults`);

// // // // //     if (type === 'strengths') {
// // // // //       return [
// // // // //         'Answer provided shows engagement',
// // // // //         'Demonstrated understanding of the topic',
// // // // //         'Clear communication attempt'
// // // // //       ];
// // // // //     } else {
// // // // //       return [
// // // // //         'Add more specific examples',
// // // // //         'Elaborate on key points',
// // // // //         'Practice explaining concepts in detail'
// // // // //       ];
// // // // //     }
// // // // //   }

// // // // //   // Filter out invalid items and ensure we have at least 2 items
// // // // //   const validItems = arr
// // // // //     .filter(item => typeof item === 'string' && item.trim().length > 0)
// // // // //     .map(item => item.trim())
// // // // //     .slice(0, 3); // Max 3 items

// // // // //   if (validItems.length === 0) {
// // // // //     return validateArray(null, type); // Recursively call with null to get defaults
// // // // //   }

// // // // //   // Ensure at least 2 items
// // // // //   while (validItems.length < 2) {
// // // // //     if (type === 'strengths') {
// // // // //       validItems.push('Shows effort and understanding');
// // // // //     } else {
// // // // //       validItems.push('Continue practicing and refining your approach');
// // // // //     }
// // // // //   }

// // // // //   return validItems;
// // // // // }

// // // // // // Helper function for default evaluation
// // // // // function getDefaultEvaluation() {
// // // // //   console.log('⚠️ Using default evaluation');

// // // // //   return NextResponse.json(
// // // // //     {
// // // // //       score: 65,
// // // // //       feedback: 'Your answer has been recorded. You demonstrated engagement with the question. Consider adding more specific examples and details to strengthen your response.',
// // // // //       strengths: [
// // // // //         'Answer provided shows effort',
// // // // //         'Engaged with the question',
// // // // //         'Demonstrated willingness to respond'
// // // // //       ],
// // // // //       improvements: [
// // // // //         'Add more specific examples',
// // // // //         'Elaborate on key concepts',
// // // // //         'Practice articulating thoughts more clearly'
// // // // //       ]
// // // // //     },
// // // // //     { status: 200 }
// // // // //   );
// // // // // }



// // // // import { NextRequest, NextResponse } from 'next/server';
// // // // import Anthropic from '@anthropic-ai/sdk';

// // // // const anthropic = new Anthropic({
// // // //   apiKey: process.env.ANTHROPIC_API_KEY,
// // // // });

// // // // function buildPrompt(
// // // //   conversation: { role: 'user' | 'assistant'; content: string }[],
// // // //   interviewType: string,
// // // //   jobRole: string,
// // // //   difficulty: string
// // // // ): string {
// // // //   const conversationText = conversation
// // // //     .map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`)
// // // //     .join('\n\n');

// // // //   const categoryInstructions =
// // // //     interviewType === 'behavioral'
// // // //       ? `Evaluate these 2 categories:
// // // // 1. "Communication & Clarity" — how well they expressed ideas, structured answers, used examples
// // // // 2. "Behavioral Competency" — STAR method usage, real examples, self-awareness, soft skills`
// // // //       : interviewType === 'technical'
// // // //       ? `Evaluate these 2 categories:
// // // // 1. "Technical Knowledge" — accuracy, depth, understanding of concepts, terminology
// // // // 2. "Problem Solving" — approach, reasoning, system design thinking, edge cases`
// // // //       : `Evaluate these 4 categories:
// // // // 1. "Communication & Clarity" — expression, structure, examples
// // // // 2. "Behavioral Competency" — STAR method, real examples, soft skills
// // // // 3. "Technical Knowledge" — accuracy, depth, concepts
// // // // 4. "Problem Solving" — approach, reasoning, system design`;

// // // //   return `You are an expert technical recruiter evaluating a ${difficulty} level ${interviewType} interview for a ${jobRole} position.

// // // // Here is the full interview conversation:

// // // // ${conversationText}

// // // // ${categoryInstructions}

// // // // Respond ONLY with a valid JSON object in exactly this format, no markdown, no explanation:
// // // // {
// // // //   "overallScore": <number 0-100>,
// // // //   "overallFeedback": "<2-3 sentence summary of the candidate's overall performance>",
// // // //   "categories": [
// // // //     {
// // // //       "name": "<category name>",
// // // //       "score": <number 0-100>,
// // // //       "feedback": "<2-3 sentences specific to this category>",
// // // //       "strengths": ["<specific strength 1>", "<specific strength 2>"],
// // // //       "improvements": ["<specific improvement 1>", "<specific improvement 2>"]
// // // //     }
// // // //   ],
// // // //   "strengths": ["<overall strength 1>", "<overall strength 2>", "<overall strength 3>"],
// // // //   "improvements": ["<overall improvement 1>", "<overall improvement 2>", "<overall improvement 3>"],
// // // //   "hiringRecommendation": "<one of: Strong Yes, Yes, Maybe, No>"
// // // // }`;
// // // // }

// // // // export async function POST(request: NextRequest) {
// // // //   try {
// // // //     const body = await request.json();
// // // //     const { conversation, interviewType, jobRole, difficulty } = body;

// // // //     // Validate
// // // //     if (!conversation || !Array.isArray(conversation) || conversation.length === 0) {
// // // //       return NextResponse.json({ error: 'No conversation provided' }, { status: 400 });
// // // //     }

// // // //     const prompt = buildPrompt(conversation, interviewType, jobRole, difficulty);

// // // //     console.log(`🤖 Claude evaluating ${conversation.length} messages for ${jobRole} (${interviewType})...`);

// // // //     const message = await anthropic.messages.create({
// // // //       model: 'claude-opus-4-6',
// // // //       max_tokens: 1500,
// // // //       messages: [{ role: 'user', content: prompt }],
// // // //     });

// // // //     const rawText = message.content
// // // //       .filter(b => b.type === 'text')
// // // //       .map(b => (b as any).text)
// // // //       .join('');

// // // //     // Strip any markdown fences if present
// // // //     const cleaned = rawText.replace(/```json|```/g, '').trim();
// // // //     const result = JSON.parse(cleaned);

// // // //     console.log(`✅ Claude evaluation complete: ${result.overallScore}/100 — ${result.hiringRecommendation}`);

// // // //     return NextResponse.json(result);
// // // //   } catch (error: any) {
// // // //     console.error('Claude evaluation error:', error?.message || error);
// // // //     // Return safe defaults so the results page never crashes
// // // //     return NextResponse.json({
// // // //       overallScore: 60,
// // // //       overallFeedback: 'Interview completed. The AI evaluation encountered an issue but your conversation has been saved.',
// // // //       categories: [],
// // // //       strengths: ['Completed the full interview', 'Engaged with the interviewer'],
// // // //       improvements: ['Practice structuring answers with the STAR method', 'Add more specific examples'],
// // // //       hiringRecommendation: 'Maybe',
// // // //     });
// // // //   }
// // // // }





// // // import { NextRequest, NextResponse } from 'next/server';
// // // import Anthropic from '@anthropic-ai/sdk';

// // // const anthropic = new Anthropic({
// // //   apiKey: process.env.ANTHROPIC_API_KEY,
// // // });

// // // function buildPrompt(
// // //   conversation: { role: 'user' | 'assistant'; content: string }[],
// // //   interviewType: string,
// // //   jobRole: string,
// // //   difficulty: string
// // // ): string {
// // //   const conversationText = conversation
// // //     .map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`)
// // //     .join('\n\n');

// // //   const categoryInstructions =
// // //     interviewType === 'behavioral'
// // //       ? `Evaluate these 2 categories:
// // // 1. "Communication & Clarity" — how well they expressed ideas, structured answers, used real examples
// // // 2. "Behavioral Competency" — STAR method usage, real examples, self-awareness, soft skills`
// // //       : interviewType === 'technical'
// // //       ? `Evaluate these 2 categories:
// // // 1. "Technical Knowledge" — accuracy, depth, understanding of concepts, terminology
// // // 2. "Problem Solving" — approach, reasoning, system design thinking, edge cases`
// // //       : `Evaluate these 4 categories:
// // // 1. "Communication & Clarity" — expression, structure, examples
// // // 2. "Behavioral Competency" — STAR method, real examples, soft skills
// // // 3. "Technical Knowledge" — accuracy, depth, concepts
// // // 4. "Problem Solving" — approach, reasoning, system design`;

// // //   return `You are a STRICT and HONEST technical recruiter evaluating a ${difficulty} level ${interviewType} interview for a ${jobRole} position.

// // // Your job is to give an ACCURATE, REALISTIC assessment. Do NOT be generous. Do NOT inflate scores.

// // // STRICT SCORING RULES — follow these exactly:
// // // - Answers like "no", "not yet", "I don't know", "I haven't used it" = 0-5 points for that area
// // // - One-word or one-sentence answers with no explanation = 15-20 points
// // // - Vague answers with no specific examples = 10-20 points
// // // - Partial answers that show some knowledge = 25-40 points
// // // - Good answers with some detail but missing depth = 45-60 points
// // // - Strong answers with clear examples and depth = 65-80 points
// // // - Exceptional answers with metrics, STAR format, deep knowledge = 85-100 points

// // // HIRING RECOMMENDATION RULES:
// // // - "Strong Yes" = only if overall score is 85+
// // // - "Yes" = only if overall score is 70-84
// // // - "Maybe" = only if overall score is 50-69
// // // - "No" = if overall score is below 50 OR if candidate said "no/not yet/don't know" to most questions

// // // Here is the full interview conversation to evaluate:

// // // ${conversationText}

// // // ${categoryInstructions}

// // // IMPORTANT:
// // // - If the candidate gave mostly short, negative, or vague answers — score must reflect that honestly (likely 20-45 range)
// // // - Do not reward a candidate for simply completing the interview
// // // - Be specific in feedback about WHAT they said wrong or right
// // // - Strengths should only list things the candidate actually demonstrated
// // // - If no real strengths were shown, say so honestly

// // // Respond ONLY with a valid JSON object in exactly this format, no markdown, no explanation:
// // // {
// // //   "overallScore": <number 0-100>,
// // //   "overallFeedback": "<2-3 honest sentences summarizing actual performance based on what was said>",
// // //   "categories": [
// // //     {
// // //       "name": "<category name>",
// // //       "score": <number 0-100>,
// // //       "feedback": "<2-3 honest sentences about THIS category based on actual answers>",
// // //       "strengths": ["<only real strengths actually shown, can be empty array []>"],
// // //       "improvements": ["<specific thing they need to improve based on what they actually said>"]
// // //     }
// // //   ],
// // //   "strengths": ["<only list real strengths shown, can be just 1 if that is all>"],
// // //   "improvements": ["<top 3 most important things to fix>"],
// // //   "hiringRecommendation": "<Strong Yes | Yes | Maybe | No>"
// // // }`;
// // // }

// // // export async function POST(request: NextRequest) {
// // //   try {
// // //     const body = await request.json();
// // //     const { conversation, interviewType, jobRole, difficulty } = body;

// // //     // Validate
// // //     if (!conversation || !Array.isArray(conversation) || conversation.length === 0) {
// // //       return NextResponse.json({ error: 'No conversation provided' }, { status: 400 });
// // //     }

// // //     const prompt = buildPrompt(conversation, interviewType, jobRole, difficulty);

// // //     console.log(`🤖 Claude evaluating ${conversation.length} messages for ${jobRole} (${interviewType})...`);

// // //     const message = await anthropic.messages.create({
// // //       model: 'claude-opus-4-6',
// // //       max_tokens: 1500,
// // //       messages: [{ role: 'user', content: prompt }],
// // //     });

// // //     const rawText = message.content
// // //       .filter(b => b.type === 'text')
// // //       .map(b => (b as any).text)
// // //       .join('');

// // //     // Strip any markdown fences if present
// // //     const cleaned = rawText.replace(/```json|```/g, '').trim();
// // //     const result = JSON.parse(cleaned);

// // //     console.log(`✅ Claude evaluation complete: ${result.overallScore}/100 — ${result.hiringRecommendation}`);

// // //     return NextResponse.json(result);
// // //   } catch (error: any) {
// // //     console.error('Claude evaluation error:', error?.message || error);
// // //     // Return safe defaults so the results page never crashes
// // //     return NextResponse.json({
// // //       overallScore: 60,
// // //       overallFeedback: 'Interview completed. The AI evaluation encountered an issue but your conversation has been saved.',
// // //       categories: [],
// // //       strengths: ['Completed the full interview', 'Engaged with the interviewer'],
// // //       improvements: ['Practice structuring answers with the STAR method', 'Add more specific examples'],
// // //       hiringRecommendation: 'Maybe',
// // //     });
// // //   }
// // // }






// // import { NextRequest, NextResponse } from 'next/server';
// // import Anthropic from '@anthropic-ai/sdk';

// // const anthropic = new Anthropic({
// //   apiKey: process.env.ANTHROPIC_API_KEY,
// // });

// // function buildPrompt(
// //   conversation: { role: 'user' | 'assistant'; content: string }[],
// //   interviewType: string,
// //   jobRole: string,
// //   difficulty: string
// // ): string {
// //   const conversationText = conversation
// //     .map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`)
// //     .join('\n\n');

// //   const categoryInstructions =
// //     interviewType === 'behavioral'
// //       ? `Evaluate these 2 categories:
// // 1. "Communication & Clarity" — how well they expressed ideas, structured answers, used real examples
// // 2. "Behavioral Competency" — STAR method usage, real examples, self-awareness, soft skills`
// //       : interviewType === 'technical'
// //       ? `Evaluate these 2 categories:
// // 1. "Technical Knowledge" — accuracy, depth, understanding of concepts, terminology
// // 2. "Problem Solving" — approach, reasoning, system design thinking, edge cases`
// //       : `Evaluate these 4 categories:
// // 1. "Communication & Clarity" — expression, structure, examples
// // 2. "Behavioral Competency" — STAR method, real examples, soft skills
// // 3. "Technical Knowledge" — accuracy, depth, concepts
// // 4. "Problem Solving" — approach, reasoning, system design`;

// //   return `You are a STRICT and BRUTALLY HONEST technical recruiter evaluating a ${difficulty} level ${interviewType} interview for a ${jobRole} role.

// // Your ONLY job is to give an accurate score based on WHAT THE CANDIDATE ACTUALLY SAID. Never be generous. Never reward effort alone.

// // ══════════════════════════════════════════
// // SCORING SCALE — apply per answer, then average:
// // ══════════════════════════════════════════
// // • "no" / "not yet" / "I don't know" / "skip" / silence / no answer = 0 points
// // • One word or one sentence, zero explanation = 5 points MAX
// // • Vague answer, no examples, no detail = 5–10 points MAX
// // • Partial knowledge, shows some awareness but incomplete = 20–30 points MAX
// // • Good answer but missing depth or real examples = 31–50 points MAX
// // • Strong answer with clear real examples and structure = 50–70 points MAX
// // • Exceptional: STAR format, metrics, deep insight, thorough = 71–100 points

// // ══════════════════════════════════════════
// // OVERALL SCORE RULES:
// // ══════════════════════════════════════════
// // • Average ALL candidate answers using the scale above
// // • If candidate skipped or said no/not yet to MORE THAN HALF the questions → overall score MUST be 0–15
// // • If candidate gave mostly vague/one-word answers → overall score MUST be 5–20
// // • NEVER round up. Be conservative. A bad interview should score badly.

// // ══════════════════════════════════════════
// // HIRING RECOMMENDATION — strictly enforce:
// // ══════════════════════════════════════════
// // • "Strong Yes" = ONLY if overall score ≥ 80
// // • "Yes" = ONLY if overall score 60–79
// // • "Maybe" = ONLY if overall score 35–59
// // • "No" = if overall score < 35 OR candidate skipped/said no to most questions

// // ══════════════════════════════════════════
// // CONVERSATION TO EVALUATE:
// // ══════════════════════════════════════════
// // ${conversationText}

// // ${categoryInstructions}

// // ══════════════════════════════════════════
// // RULES FOR YOUR RESPONSE:
// // ══════════════════════════════════════════
// // • Strengths = ONLY things the candidate ACTUALLY demonstrated. If none, return []
// // • Feedback must reference what they ACTUALLY SAID, not what they could have said
// // • Do NOT give credit for completing the interview or being polite
// // • Do NOT mention what a good answer would look like in the score — only score what was said
// // • Improvements must be SPECIFIC to their actual weak answers

// // Respond ONLY with valid JSON, no markdown fences, no explanation outside JSON:
// // {
// //   "overallScore": <number 0-100>,
// //   "overallFeedback": "<2-3 brutally honest sentences about actual performance>",
// //   "categories": [
// //     {
// //       "name": "<category name>",
// //       "score": <number 0-100>,
// //       "feedback": "<2-3 honest sentences referencing what they actually said>",
// //       "strengths": [],
// //       "improvements": ["<specific improvement based on actual answer given>"]
// //     }
// //   ],
// //   "strengths": [],
// //   "improvements": ["<top 3 specific improvements based on actual answers>"],
// //   "hiringRecommendation": "<Strong Yes | Yes | Maybe | No>"
// // }`;
// // }

// // export async function POST(request: NextRequest) {
// //   try {
// //     const body = await request.json();
// //     const { conversation, interviewType, jobRole, difficulty } = body;

// //     if (!conversation || !Array.isArray(conversation) || conversation.length === 0) {
// //       return NextResponse.json({ error: 'No conversation provided' }, { status: 400 });
// //     }

// //     const prompt = buildPrompt(conversation, interviewType, jobRole, difficulty);

// //     console.log(`🤖 Claude evaluating ${conversation.length} messages for ${jobRole} (${interviewType})...`);

// //     const message = await anthropic.messages.create({
// //       model: 'claude-opus-4-6',
// //       max_tokens: 1500,
// //       messages: [{ role: 'user', content: prompt }],
// //     });

// //     const rawText = message.content
// //       .filter(b => b.type === 'text')
// //       .map(b => (b as any).text)
// //       .join('');

// //     const cleaned = rawText.replace(/```json|```/g, '').trim();
// //     const result = JSON.parse(cleaned);

// //     console.log(`✅ Claude evaluation: ${result.overallScore}/100 — ${result.hiringRecommendation}`);
// //     return NextResponse.json(result);

// //   } catch (error: any) {
// //     console.error('Claude evaluation error:', error?.message || error);
// //     // Honest defaults — not inflated
// //     return NextResponse.json({
// //       overallScore: 10,
// //       overallFeedback: 'The AI evaluation encountered an issue. Based on the conversation, insufficient answers were provided to generate a proper assessment.',
// //       categories: [],
// //       strengths: [],
// //       improvements: [
// //         'Prepare detailed answers before your next interview',
// //         'Study the STAR method for behavioral questions',
// //         'Practice explaining technical concepts out loud',
// //       ],
// //       hiringRecommendation: 'No',
// //     });
// //   }
// // }





// import { NextRequest, NextResponse } from 'next/server';
// import Groq from 'groq-sdk';

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// function buildPrompt(
//   conversation: { role: 'user' | 'assistant'; content: string }[],
//   interviewType: string,
//   jobRole: string,
//   difficulty: string
// ): string {
//   const conversationText = conversation
//     .map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`)
//     .join('\n\n');

//   const categoryInstructions =
//     interviewType === 'behavioral'
//       ? `Evaluate these 2 categories:
// 1. "Communication & Clarity" — how well they expressed ideas, structured answers, used real examples
// 2. "Behavioral Competency" — STAR method usage, real examples, self-awareness, soft skills`
//       : interviewType === 'technical'
//       ? `Evaluate these 2 categories:
// 1. "Technical Knowledge" — accuracy, depth, understanding of concepts, terminology
// 2. "Problem Solving" — approach, reasoning, system design thinking, edge cases`
//       : `Evaluate these 4 categories:
// 1. "Communication & Clarity" — expression, structure, examples
// 2. "Behavioral Competency" — STAR method, real examples, soft skills
// 3. "Technical Knowledge" — accuracy, depth, concepts
// 4. "Problem Solving" — approach, reasoning, system design`;

//   return `You are a STRICT and BRUTALLY HONEST technical recruiter evaluating a ${difficulty} level ${interviewType} interview for a ${jobRole} role.

// Your ONLY job is to give an accurate score based on WHAT THE CANDIDATE ACTUALLY SAID. Never be generous. Never reward effort alone.

// SCORING SCALE:
// • "no" / "not yet" / "I don't know" / "skip" / silence = 0 points
// • One word or one sentence, zero explanation = 5 points MAX
// • Vague answer, no examples = 5-10 points MAX
// • Partial knowledge, incomplete = 20-30 points MAX
// • Good but missing depth = 31-50 points MAX
// • Strong with real examples = 50-70 points MAX
// • Exceptional STAR + metrics = 71-100 points

// OVERALL SCORE RULES:
// • Skipped or said no/not yet to MORE THAN HALF → score MUST be 0-15
// • Mostly vague/one-word answers → score MUST be 5-20
// • NEVER round up generously

// HIRING RECOMMENDATION:
// • "Strong Yes" = score >= 80 ONLY
// • "Yes" = score 60-79 ONLY
// • "Maybe" = score 35-59 ONLY
// • "No" = score < 35 OR skipped most questions

// CONVERSATION TO EVALUATE:
// ${conversationText}

// ${categoryInstructions}

// IMPORTANT RULES FOR RESPONSE:
// • Strengths = ONLY things candidate actually demonstrated. Empty array [] if none
// • Reference what they ACTUALLY SAID in feedback
// • No credit for just completing the interview

// Respond ONLY with valid JSON (no markdown fences):
// {
//   "overallScore": <0-100>,
//   "overallFeedback": "<2-3 brutally honest sentences based on actual answers>",
//   "categories": [
//     {
//       "name": "<category name>",
//       "score": <0-100>,
//       "feedback": "<2-3 honest sentences referencing actual answers>",
//       "strengths": [],
//       "improvements": ["<specific improvement based on what they said>"]
//     }
//   ],
//   "strengths": [],
//   "improvements": ["<top 3 specific improvements>"],
//   "hiringRecommendation": "<Strong Yes | Yes | Maybe | No>"
// }`;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { conversation, interviewType, jobRole, difficulty } = body;

//     if (!conversation || !Array.isArray(conversation) || conversation.length === 0) {
//       return NextResponse.json({ error: 'No conversation provided' }, { status: 400 });
//     }

//     const prompt = buildPrompt(conversation, interviewType, jobRole, difficulty);
//     console.log(`🤖 Groq evaluating ${conversation.length} messages for ${jobRole} (${interviewType})...`);

//     const completion = await groq.chat.completions.create({
//       model: 'llama-3.3-70b-versatile',
//       temperature: 0.3,
//       max_tokens: 1500,
//       messages: [{ role: 'user', content: prompt }],
//     });

//     const rawText = completion.choices[0]?.message?.content || '';
//     const cleaned = rawText.replace(/```json|```/g, '').trim();
//     const result = JSON.parse(cleaned);

//     console.log(`✅ Groq evaluation: ${result.overallScore}/100 — ${result.hiringRecommendation}`);
//     return NextResponse.json(result);

//   } catch (error: any) {
//     console.error('Evaluation error:', error?.message || error);
//     return NextResponse.json({
//       overallScore: 10,
//       overallFeedback: 'Evaluation failed. Insufficient answers were provided to generate a proper assessment.',
//       categories: [],
//       strengths: [],
//       improvements: [
//         'Prepare detailed answers before your next interview',
//         'Study the STAR method for behavioral questions',
//         'Practice explaining technical concepts out loud',
//       ],
//       hiringRecommendation: 'No',
//     });
//   }
// }




import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function buildPrompt(
  conversation: { role: 'user' | 'assistant'; content: string }[],
  interviewType: string,
  jobRole: string,
  difficulty: string
): string {
  const conversationText = conversation
    .map(m => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`)
    .join('\n\n');

  const categoryInstructions =
    interviewType === 'behavioral'
      ? `Evaluate these 2 categories:
1. "Communication & Clarity" — how well they expressed ideas, structured answers, used real examples
2. "Behavioral Competency" — STAR method usage, real examples, self-awareness, soft skills`
      : interviewType === 'technical'
      ? `Evaluate these 2 categories:
1. "Technical Knowledge" — accuracy, depth, understanding of concepts, terminology
2. "Problem Solving" — approach, reasoning, system design thinking, edge cases`
      : `Evaluate these 4 categories:
1. "Communication & Clarity" — expression, structure, examples
2. "Behavioral Competency" — STAR method, real examples, soft skills
3. "Technical Knowledge" — accuracy, depth, concepts
4. "Problem Solving" — approach, reasoning, system design`;

  return `You are a STRICT and BRUTALLY HONEST technical recruiter evaluating a ${difficulty} level ${interviewType} interview for a ${jobRole} role.

Your ONLY job is to give an accurate score based on WHAT THE CANDIDATE ACTUALLY SAID. Never be generous. Never reward effort alone.

SCORING SCALE:
• "no" / "not yet" / "I don't know" / "skip" / silence = 0 points
• One word or one sentence, zero explanation = 15 points MAX
• Vague answer, no examples = 15-30 points MAX
• Partial knowledge, incomplete = 30-50 points MAX
• Good but missing depth = 50-60 points MAX
• Strong with real examples = 60-85 points MAX
• Exceptional STAR + metrics = 85-100 points

OVERALL SCORE RULES:
• Skipped or said no/not yet to MORE THAN HALF → score MUST be 0-10
• Mostly vague/one-word answers → score MUST be 15-30
• NEVER round up generously

HIRING RECOMMENDATION:
• "Strong Yes" = score >= 85 ONLY
• "Yes" = score 60-84 ONLY
• "Maybe" = score 30-59 ONLY
• "No" = score < 30 OR skipped most questions

CONVERSATION TO EVALUATE:
${conversationText}

${categoryInstructions}

IMPORTANT RULES FOR RESPONSE:
• Strengths = ONLY things candidate actually demonstrated. Empty array [] if none
• Reference what they ACTUALLY SAID in feedback
• No credit for just completing the interview

Respond ONLY with valid JSON (no markdown fences):
{
  "overallScore": <0-100>,
  "overallFeedback": "<2-3 brutally honest sentences based on actual answers>",
  "categories": [
    {
      "name": "<category name>",
      "score": <0-100>,
      "feedback": "<2-3 honest sentences referencing actual answers>",
      "strengths": [],
      "improvements": ["<specific improvement based on what they said>"]
    }
  ],
  "strengths": [],
  "improvements": ["<top 3 specific improvements>"],
  "hiringRecommendation": "<Strong Yes | Yes | Maybe | No>"
}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { conversation, interviewType, jobRole, difficulty } = body;

    if (!conversation || !Array.isArray(conversation) || conversation.length === 0) {
      return NextResponse.json({ error: 'No conversation provided' }, { status: 400 });
    }

    const prompt = buildPrompt(conversation, interviewType, jobRole, difficulty);
    console.log(`🤖 Groq evaluating ${conversation.length} messages for ${jobRole} (${interviewType})...`);

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = completion.choices[0]?.message?.content || '';
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleaned);

    console.log(`✅ Groq evaluation: ${result.overallScore}/100 — ${result.hiringRecommendation}`);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error('Evaluation error:', error?.message || error);
    return NextResponse.json({
      overallScore: 10,
      overallFeedback: 'Evaluation failed. Insufficient answers were provided to generate a proper assessment.',
      categories: [],
      strengths: [],
      improvements: [
        'Prepare detailed answers before your next interview',
        'Study the STAR method for behavioral questions',
        'Practice explaining technical concepts out loud',
      ],
      hiringRecommendation: 'No',
    });
  }
}