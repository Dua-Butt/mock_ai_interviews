// import { NextRequest, NextResponse } from 'next/server';

// export const runtime = 'edge';

// interface EvaluateAnswerRequest {
//   question: string;
//   category: string;
//   answer: string;
//   jobRole: string;
//   difficulty: string;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body: EvaluateAnswerRequest = await request.json();
//     const { question, category, answer, jobRole, difficulty } = body;

//     // Validate input
//     if (!question || !answer || !jobRole || !difficulty) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     const prompt = `You are an expert technical interviewer evaluating a candidate's answer for a ${jobRole} position.

// Interview Details:
// - Question Category: ${category}
// - Difficulty Level: ${difficulty}
// - Question: ${question}
// - Candidate's Answer: ${answer}

// Evaluate this answer and provide:
// 1. A score from 0-100 (be realistic and fair)
// 2. Detailed feedback (2-3 sentences explaining the score)
// 3. 2-3 key strengths in the answer
// 4. 2-3 specific areas for improvement

// Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, no extra text):
// {
//   "score": <number between 0-100>,
//   "feedback": "<detailed 2-3 sentence feedback>",
//   "strengths": ["<specific strength 1>", "<specific strength 2>"],
//   "improvements": ["<specific improvement 1>", "<specific improvement 2>"]
// }`;

//     console.log('Evaluating answer with Grok AI...');

//     // Call Grok API
//     const response = await fetch('https://api.x.ai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: 'grok-beta',
//         messages: [
//           {
//             role: 'system',
//             content: 'You are an expert interviewer. Evaluate answers fairly and provide constructive feedback. Respond ONLY with valid JSON, no markdown, no explanations.'
//           },
//           {
//             role: 'user',
//             content: prompt
//           }
//         ],
//         temperature: 0.5,
//         max_tokens: 800
//       })
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error('Grok API Error:', response.status, errorText);
//       throw new Error(`Grok API error: ${response.status}`);
//     }

//     const data = await response.json();
//     const aiResponse = data.choices[0].message.content;

//     console.log('Grok AI Response:', aiResponse);

//     // Parse the response
//     let evaluation;
//     try {
//       // Remove markdown code blocks if present
//       const cleanedText = aiResponse
//         .replace(/```json\n?/g, '')
//         .replace(/```\n?/g, '')
//         .trim();

//       evaluation = JSON.parse(cleanedText);
//     } catch (parseError) {
//       console.error('Failed to parse Grok response:', parseError);

//       // Fallback: try to extract JSON from the text
//       const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         evaluation = JSON.parse(jsonMatch[0]);
//       } else {
//         // Return default evaluation if parsing fails
//         evaluation = {
//           score: 60,
//           feedback: 'Your answer was recorded. The evaluation system encountered an issue, but your response shows effort and understanding.',
//           strengths: ['Answer provided', 'Demonstrated engagement'],
//           improvements: ['Try to be more specific', 'Provide concrete examples']
//         };
//       }
//     }

//     // Validate and sanitize the evaluation
//     if (typeof evaluation.score !== 'number') {
//       evaluation.score = 60;
//     }

//     evaluation.score = Math.max(0, Math.min(100, Math.round(evaluation.score)));

//     if (!evaluation.feedback || typeof evaluation.feedback !== 'string') {
//       evaluation.feedback = 'Good effort. Continue practicing to improve your interview skills.';
//     }

//     if (!Array.isArray(evaluation.strengths)) {
//       evaluation.strengths = ['Answer recorded'];
//     }

//     if (!Array.isArray(evaluation.improvements)) {
//       evaluation.improvements = ['Practice more complex scenarios'];
//     }

//     console.log(`✅ Successfully evaluated answer: ${evaluation.score}/100`);

//     return NextResponse.json(evaluation, { status: 200 });

//   } catch (error: any) {
//     console.error('Error evaluating answer:', error);

//     // Return a default evaluation on error so interview can continue
//     return NextResponse.json(
//       {
//         score: 60,
//         feedback: 'Your answer has been recorded. Due to a technical issue, we provided a default evaluation. Your response showed effort and understanding.',
//         strengths: ['Answer provided', 'Engaged with the question'],
//         improvements: ['Review the question requirements', 'Practice similar scenarios']
//       },
//       { status: 200 }
//     );
//   }
// }





import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface EvaluateAnswerRequest {
  question: string;
  category: string;
  answer: string;
  jobRole: string;
  difficulty: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EvaluateAnswerRequest = await request.json();
    const { question, category, answer, jobRole, difficulty } = body;

    console.log('📊 Evaluating answer:', { question: question.substring(0, 50), answerLength: answer.length });

    // Validate input
    if (!question || !answer || !jobRole || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for Groq API key
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error('❌ GROQ_API_KEY not found - returning default evaluation');
      return getDefaultEvaluation();
    }

    const systemPrompt = 'You are an expert technical interviewer evaluating candidates fairly and constructively. Respond ONLY with valid JSON. No markdown. No code blocks. No explanations outside the JSON.';

    const userPrompt = `Evaluate this interview answer for a ${jobRole} position.

Interview Details:
- Question Category: ${category}
- Difficulty Level: ${difficulty}
- Question: ${question}
- Candidate's Answer: ${answer}

Provide a fair, constructive evaluation with:
1. Score (0-100): Be realistic. 70+ for good answers, 80+ for excellent, 90+ for outstanding
2. Feedback: 2-3 sentences explaining the score
3. Strengths: 2-3 specific positive aspects of the answer
4. Improvements: 2-3 specific, actionable suggestions

OUTPUT FORMAT (strict JSON only):
{
  "score": <number 0-100>,
  "feedback": "<2-3 sentence evaluation>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
}

Return ONLY the JSON object. No markdown. No code blocks.`;

    console.log('🤖 Calling Groq AI for evaluation...');

    // Call Groq AI API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1000,
        top_p: 1,
        stream: false
      })
    });

    console.log('📡 Groq API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Groq API Error:', response.status, errorText);
      return getDefaultEvaluation();
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      console.error('❌ No content in AI response');
      return getDefaultEvaluation();
    }

    console.log('📝 Raw AI Response:', aiResponse.substring(0, 300));

    // Parse the response
    let evaluation;
    try {
      // Clean the response
      let cleanedText = aiResponse.trim();

      // Remove markdown code blocks
      cleanedText = cleanedText.replace(/```json\s*/g, '');
      cleanedText = cleanedText.replace(/```\s*/g, '');

      // Find JSON object
      const jsonStart = cleanedText.indexOf('{');
      const jsonEnd = cleanedText.lastIndexOf('}') + 1;

      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        cleanedText = cleanedText.substring(jsonStart, jsonEnd);
      }

      console.log('🧹 Cleaned JSON:', cleanedText.substring(0, 200));

      evaluation = JSON.parse(cleanedText);
      console.log('✅ Successfully parsed evaluation JSON');

    } catch (parseError: any) {
      console.error('❌ Failed to parse AI response:', parseError.message);
      console.error('Text that failed:', aiResponse.substring(0, 500));
      return getDefaultEvaluation();
    }

    // Validate and sanitize the evaluation
    const validatedEvaluation = {
      score: validateScore(evaluation.score),
      feedback: validateFeedback(evaluation.feedback),
      strengths: validateArray(evaluation.strengths, 'strengths'),
      improvements: validateArray(evaluation.improvements, 'improvements')
    };

    console.log(`✅ Successfully evaluated answer: ${validatedEvaluation.score}/100`);
    console.log('Feedback:', validatedEvaluation.feedback.substring(0, 100));

    return NextResponse.json(validatedEvaluation, { status: 200 });

  } catch (error: any) {
    console.error('❌ Error evaluating answer:', error.message);
    return getDefaultEvaluation();
  }
}

// Helper function to validate score
function validateScore(score: any): number {
  if (typeof score !== 'number' || isNaN(score)) {
    console.warn('Invalid score, using default: 65');
    return 65;
  }

  // Ensure score is between 0-100
  const validScore = Math.max(0, Math.min(100, Math.round(score)));
  console.log('Validated score:', validScore);
  return validScore;
}

// Helper function to validate feedback
function validateFeedback(feedback: any): string {
  if (typeof feedback !== 'string' || feedback.trim().length === 0) {
    console.warn('Invalid feedback, using default');
    return 'Your answer demonstrates understanding of the topic. Continue practicing to refine your explanations and add more specific examples.';
  }

  return feedback.trim();
}

// Helper function to validate arrays
function validateArray(arr: any, type: 'strengths' | 'improvements'): string[] {
  if (!Array.isArray(arr) || arr.length === 0) {
    console.warn(`Invalid ${type}, using defaults`);

    if (type === 'strengths') {
      return [
        'Answer provided shows engagement',
        'Demonstrated understanding of the topic',
        'Clear communication attempt'
      ];
    } else {
      return [
        'Add more specific examples',
        'Elaborate on key points',
        'Practice explaining concepts in detail'
      ];
    }
  }

  // Filter out invalid items and ensure we have at least 2 items
  const validItems = arr
    .filter(item => typeof item === 'string' && item.trim().length > 0)
    .map(item => item.trim())
    .slice(0, 3); // Max 3 items

  if (validItems.length === 0) {
    return validateArray(null, type); // Recursively call with null to get defaults
  }

  // Ensure at least 2 items
  while (validItems.length < 2) {
    if (type === 'strengths') {
      validItems.push('Shows effort and understanding');
    } else {
      validItems.push('Continue practicing and refining your approach');
    }
  }

  return validItems;
}

// Helper function for default evaluation
function getDefaultEvaluation() {
  console.log('⚠️ Using default evaluation');

  return NextResponse.json(
    {
      score: 65,
      feedback: 'Your answer has been recorded. You demonstrated engagement with the question. Consider adding more specific examples and details to strengthen your response.',
      strengths: [
        'Answer provided shows effort',
        'Engaged with the question',
        'Demonstrated willingness to respond'
      ],
      improvements: [
        'Add more specific examples',
        'Elaborate on key concepts',
        'Practice articulating thoughts more clearly'
      ]
    },
    { status: 200 }
  );
}

