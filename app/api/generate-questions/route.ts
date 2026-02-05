// import { NextRequest, NextResponse } from 'next/server';
// import { generateMockQuestions } from '@/lib/mock-questions';

// export const runtime = 'edge';

// interface GenerateQuestionsRequest {
//   jobRole: string;
//   company?: string;
//   interviewType: 'technical' | 'behavioral' | 'mixed';
//   difficulty: 'easy' | 'medium' | 'hard';
//   numberOfQuestions: number;
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body: GenerateQuestionsRequest = await request.json();
//     const { jobRole, company, interviewType, difficulty, numberOfQuestions } = body;

//     // Validate input
//     if (!jobRole || !interviewType || !difficulty || !numberOfQuestions) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     if (numberOfQuestions < 3 || numberOfQuestions > 10) {
//       return NextResponse.json(
//         { error: 'Number of questions must be between 3 and 10' },
//         { status: 400 }
//       );
//     }

//     // Build the prompt based on interview type and difficulty
//     const companyContext = company ? ` at ${company}` : '';

//     let interviewFocus = '';
//     if (interviewType === 'technical') {
//       interviewFocus = 'Focus exclusively on technical questions covering programming concepts, algorithms, system design, and technical problem-solving.';
//     } else if (interviewType === 'behavioral') {
//       interviewFocus = 'Focus exclusively on behavioral questions covering past experiences, soft skills, teamwork, leadership, and workplace scenarios.';
//     } else {
//       interviewFocus = 'Create a balanced mix of both technical and behavioral questions.';
//     }

//     let difficultyContext = '';
//     if (difficulty === 'easy') {
//       difficultyContext = 'Questions should be entry-level, suitable for junior positions or candidates with 0-2 years of experience.';
//     } else if (difficulty === 'medium') {
//       difficultyContext = 'Questions should be intermediate-level, suitable for mid-level positions or candidates with 2-5 years of experience.';
//     } else {
//       difficultyContext = 'Questions should be advanced-level, suitable for senior positions or candidates with 5+ years of experience.';
//     }

//     const prompt = `You are an expert technical recruiter creating interview questions for a ${jobRole} position${companyContext}.

// Interview Type: ${interviewType}
// Difficulty Level: ${difficulty}
// Number of Questions: ${numberOfQuestions}

// ${interviewFocus}
// ${difficultyContext}

// IMPORTANT INSTRUCTIONS:
// 1. Generate exactly ${numberOfQuestions} interview questions
// 2. Each question should be clear, professional, and relevant to the ${jobRole} position
// 3. For technical questions: Cover relevant technologies, concepts, and problem-solving skills
// 4. For behavioral questions: Use the STAR method framework (Situation, Task, Action, Result)
// 5. Avoid special characters like /, *, #, or formatting symbols (these will be read by a voice assistant)
// 6. Each question should be a complete, standalone question
// 7. Questions should be conversational and suitable for voice interaction

// For each question, provide:
// - question: The interview question text
// - category: A brief category label (e.g., "JavaScript", "System Design", "Leadership", "Problem Solving")

// Return ONLY a valid JSON array in this exact format, with no additional text, markdown, or formatting:
// [
//   {
//     "question": "Can you describe your experience with...",
//     "category": "Experience"
//   },
//   {
//     "question": "How would you approach...",
//     "category": "Problem Solving"
//   }
// ]`;

//     console.log('Generating questions with Grok AI...');

//     let questions;
//     let usedFallback = false;

//     try {
//       // Generate questions using Grok AI (X.AI API)
//       const response = await fetch('https://api.x.ai/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: 'grok-beta',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are an expert technical interviewer. Generate interview questions and respond ONLY with a valid JSON array. No markdown, no code blocks, no explanation - just the raw JSON array.'
//             },
//             {
//               role: 'user',
//               content: prompt
//             }
//           ],
//           temperature: 0.7,
//           max_tokens: 2000
//         })
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('Grok API Error:', response.status, errorText);

//         // Check if it's a quota/rate limit error
//         const isQuotaError = response.status === 429 ||
//                            errorText.includes('quota') ||
//                            errorText.includes('rate limit');

//         if (isQuotaError) {
//           console.log('⚠️ Grok API quota exceeded, using fallback questions');
//           usedFallback = true;
//           questions = generateMockQuestions(jobRole, interviewType, difficulty, numberOfQuestions);
//         } else {
//           throw new Error(`Grok API error: ${response.status}`);
//         }
//       } else {
//         const data = await response.json();
//         const aiResponse = data.choices[0].message.content;

//         console.log('Grok AI Response:', aiResponse);

//         // Parse the response
//         try {
//           // Remove any markdown code blocks if present
//           const cleanedText = aiResponse
//             .replace(/```json\n?/g, '')
//             .replace(/```\n?/g, '')
//             .trim();

//           questions = JSON.parse(cleanedText);
//         } catch (parseError) {
//           console.error('Failed to parse Grok response:', parseError);
//           console.error('Raw text:', aiResponse);

//           // Fallback: try to extract JSON array from the text
//           const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
//           if (jsonMatch) {
//             questions = JSON.parse(jsonMatch[0]);
//           } else {
//             console.log('⚠️ Failed to parse AI response, using fallback');
//             usedFallback = true;
//             questions = generateMockQuestions(jobRole, interviewType, difficulty, numberOfQuestions);
//           }
//         }
//       }
//     } catch (aiError: any) {
//       console.error('Error calling Grok API:', aiError);
//       console.log('⚠️ AI error occurred, using fallback questions');
//       usedFallback = true;
//       questions = generateMockQuestions(jobRole, interviewType, difficulty, numberOfQuestions);
//     }

//     // Validate the questions format
//     if (!Array.isArray(questions) || questions.length === 0) {
//       console.log('⚠️ Invalid AI response format, using fallback questions');
//       usedFallback = true;
//       questions = generateMockQuestions(
//         jobRole,
//         interviewType,
//         difficulty,
//         numberOfQuestions
//       );
//     }

//     // Ensure all questions have the required fields
//     const validatedQuestions = questions.map((q, index) => ({
//       question: q.question || `Question ${index + 1}`,
//       category: q.category || 'General',
//     }));

//     console.log(`Successfully generated ${validatedQuestions.length} questions${usedFallback ? ' (using fallback)' : ''}`);

//     return NextResponse.json(
//       {
//         success: true,
//         questions: validatedQuestions,
//         usedFallback: usedFallback,
//         message: usedFallback ? 'AI quota exceeded. Using high-quality curated questions.' : undefined
//       },
//       { status: 200 }
//     );

//   } catch (error: any) {
//     console.error('Error generating questions:', error);

//     // Last resort: use mock questions
//     try {
//       const body: GenerateQuestionsRequest = await request.json();
//       const { jobRole, interviewType, difficulty, numberOfQuestions } = body;

//       console.log('⚠️ Critical error, using fallback questions');
//       const fallbackQuestions = generateMockQuestions(
//         jobRole,
//         interviewType,
//         difficulty,
//         numberOfQuestions
//       );

//       return NextResponse.json(
//         {
//           success: true,
//           questions: fallbackQuestions,
//           usedFallback: true,
//           message: 'Using high-quality curated questions. AI service temporarily unavailable.'
//         },
//         { status: 200 }
//       );
//     } catch (fallbackError) {
//       // If even fallback fails, return error
//       return NextResponse.json(
//         {
//           error: 'Failed to generate questions',
//           details: error.message || 'Unknown error'
//         },
//         { status: 500 }
//       );
//     }
//   }
// }




import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface GenerateQuestionsRequest {
  jobRole: string;
  company?: string;
  interviewType: 'technical' | 'behavioral' | 'mixed';
  difficulty: 'easy' | 'medium' | 'hard';
  numberOfQuestions: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateQuestionsRequest = await request.json();
    const { jobRole, company, interviewType, difficulty, numberOfQuestions } = body;

    console.log('📋 Request received:', { jobRole, company, interviewType, difficulty, numberOfQuestions });

    // Validate input
    if (!jobRole || !interviewType || !difficulty || !numberOfQuestions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (numberOfQuestions < 3 || numberOfQuestions > 10) {
      return NextResponse.json(
        { error: 'Number of questions must be between 3 and 10' },
        { status: 400 }
      );
    }

    // Check if API key exists
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error('❌ GROQ_API_KEY not found in environment variables');
      return getFallbackQuestions(numberOfQuestions, interviewType, difficulty, jobRole, company);
    }

    console.log('✅ Groq API Key found:', apiKey.substring(0, 15) + '...');

    // Build the prompt
    const companyContext = company ? ` at ${company}` : '';

    let interviewFocus = '';
    if (interviewType === 'technical') {
      interviewFocus = 'Focus exclusively on technical questions covering programming concepts, algorithms, system design, and technical problem-solving.';
    } else if (interviewType === 'behavioral') {
      interviewFocus = 'Focus exclusively on behavioral questions covering past experiences, soft skills, teamwork, leadership, and workplace scenarios.';
    } else {
      interviewFocus = 'Create a balanced mix of both technical and behavioral questions.';
    }

    let difficultyContext = '';
    if (difficulty === 'easy') {
      difficultyContext = 'Questions should be entry-level, suitable for junior positions or candidates with 0-2 years of experience.';
    } else if (difficulty === 'medium') {
      difficultyContext = 'Questions should be intermediate-level, suitable for mid-level positions or candidates with 2-5 years of experience.';
    } else {
      difficultyContext = 'Questions should be advanced-level, suitable for senior positions or candidates with 5+ years of experience.';
    }

    const prompt = `You are an expert technical recruiter creating interview questions for a ${jobRole} position${companyContext}.

Interview Type: ${interviewType}
Difficulty Level: ${difficulty}
Number of Questions: ${numberOfQuestions}

${interviewFocus}
${difficultyContext}

IMPORTANT INSTRUCTIONS:
1. Generate exactly ${numberOfQuestions} interview questions
2. Each question should be clear, professional, and relevant to the ${jobRole} position
3. For technical questions: Cover relevant technologies, concepts, and problem-solving skills
4. For behavioral questions: Use the STAR method framework (Situation, Task, Action, Result)
5. Avoid special characters like /, *, #, or formatting symbols
6. Each question should be a complete, standalone question
7. Questions should be conversational and suitable for voice interaction

Return ONLY a valid JSON array in this exact format (no markdown, no code blocks, no extra text):
[
  {
    "question": "Can you describe your experience with...",
    "category": "Experience"
  },
  {
    "question": "How would you approach...",
    "category": "Problem Solving"
  }
]

Remember: Return ONLY the JSON array, nothing else.`;

    console.log('🤖 Calling Groq AI API...');

    // Call Groq AI (NOT Grok/X.AI)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Groq's fast model
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical interviewer. Generate interview questions and respond ONLY with a valid JSON array. No markdown, no code blocks, no explanation - just the raw JSON array starting with [ and ending with ].'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    console.log('📡 Groq API Response Status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Groq API Error Response:', errorText);

      // Use fallback on API error
      return getFallbackQuestions(numberOfQuestions, interviewType, difficulty, jobRole, company);
    }

    const data = await response.json();
    console.log('✅ Groq API Response received');

    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      console.error('❌ No content in AI response');
      return getFallbackQuestions(numberOfQuestions, interviewType, difficulty, jobRole, company);
    }

    console.log('📝 AI Response Content:', aiResponse);

    // Parse the response
    let questions;
    try {
      // Remove any markdown code blocks if present
      let cleanedText = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      // Remove any leading/trailing text that's not part of the JSON array
      const arrayStart = cleanedText.indexOf('[');
      const arrayEnd = cleanedText.lastIndexOf(']') + 1;

      if (arrayStart !== -1 && arrayEnd > arrayStart) {
        cleanedText = cleanedText.substring(arrayStart, arrayEnd);
      }

      console.log('🧹 Cleaned text for parsing:', cleanedText.substring(0, 200) + '...');

      questions = JSON.parse(cleanedText);
      console.log('✅ Successfully parsed AI questions:', questions.length, 'questions');

    } catch (parseError: any) {
      console.error('❌ Failed to parse AI response:', parseError);
      console.error('📄 Text that failed to parse:', aiResponse);

      return getFallbackQuestions(numberOfQuestions, interviewType, difficulty, jobRole, company);
    }

    // Validate the questions format
    if (!Array.isArray(questions) || questions.length === 0) {
      console.error('❌ AI response is not a valid array or is empty');
      return getFallbackQuestions(numberOfQuestions, interviewType, difficulty, jobRole, company);
    }

    // Ensure all questions have the required fields
    const validatedQuestions = questions.slice(0, numberOfQuestions).map((q, index) => ({
      question: q.question || `Question ${index + 1}`,
      category: q.category || 'General',
    }));

    console.log(`✅ Successfully generated ${validatedQuestions.length} questions from Groq AI`);

    return NextResponse.json(
      {
        success: true,
        questions: validatedQuestions,
        usedFallback: false
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ Critical error in generate-questions:', error);

    // Return fallback questions on any error
    return getFallbackQuestions(5, 'mixed', 'medium', 'Software Developer');
  }
}

// Comprehensive fallback questions function
function getFallbackQuestions(
  numberOfQuestions: number,
  interviewType: string,
  difficulty: string,
  jobRole: string,
  company?: string
) {
  const companyText = company ? ` at ${company}` : '';

  // Technical Questions
  const technicalQuestions = [
    {
      question: `What programming languages and technologies are you most proficient in for a ${jobRole} role?`,
      category: 'Technical Skills'
    },
    {
      question: 'Can you explain the difference between synchronous and asynchronous programming?',
      category: 'Technical Concepts'
    },
    {
      question: 'How do you approach debugging a complex issue in production?',
      category: 'Problem Solving'
    },
    {
      question: 'What is your experience with version control systems like Git?',
      category: 'Tools & Technologies'
    },
    {
      question: 'Explain the concept of API design and RESTful principles.',
      category: 'System Design'
    },
    {
      question: 'How do you ensure code quality and maintainability in your projects?',
      category: 'Best Practices'
    },
    {
      question: 'What testing strategies do you implement in your development workflow?',
      category: 'Quality Assurance'
    },
    {
      question: 'Can you describe your experience with databases and data modeling?',
      category: 'Data Management'
    },
    {
      question: 'How do you optimize application performance and identify bottlenecks?',
      category: 'Performance'
    },
    {
      question: 'What is your approach to writing secure and scalable code?',
      category: 'Security & Scalability'
    }
  ];

  // Behavioral Questions
  const behavioralQuestions = [
    {
      question: `Tell me about your experience as a ${jobRole} and what motivated you to pursue this career path${companyText}.`,
      category: 'Background & Motivation'
    },
    {
      question: 'Describe a challenging project you worked on. What was your role and how did you overcome obstacles?',
      category: 'Problem Solving'
    },
    {
      question: 'Tell me about a time when you had to work with a difficult team member. How did you handle it?',
      category: 'Teamwork'
    },
    {
      question: 'Describe a situation where you had to meet a tight deadline. How did you prioritize your tasks?',
      category: 'Time Management'
    },
    {
      question: 'Can you share an example of when you had to learn a new technology quickly?',
      category: 'Learning & Adaptability'
    },
    {
      question: 'Tell me about a time when you disagreed with a technical decision. How did you handle it?',
      category: 'Communication'
    },
    {
      question: 'Describe a project where you took initiative beyond your assigned responsibilities.',
      category: 'Leadership'
    },
    {
      question: 'How do you handle receiving constructive criticism on your work?',
      category: 'Professional Growth'
    },
    {
      question: 'Tell me about a time when you had to explain a complex technical concept to a non-technical stakeholder.',
      category: 'Communication'
    },
    {
      question: 'Describe a situation where you had to balance multiple priorities simultaneously.',
      category: 'Organization'
    }
  ];

  // Select questions based on interview type
  let questionPool;
  if (interviewType === 'technical') {
    questionPool = technicalQuestions;
  } else if (interviewType === 'behavioral') {
    questionPool = behavioralQuestions;
  } else {
    // Mix of both
    const halfTech = Math.ceil(numberOfQuestions / 2);
    const halfBehavioral = numberOfQuestions - halfTech;
    questionPool = [
      ...technicalQuestions.slice(0, halfTech),
      ...behavioralQuestions.slice(0, halfBehavioral)
    ];
  }

  const selectedQuestions = questionPool.slice(0, numberOfQuestions);

  console.log(`✅ Generated ${selectedQuestions.length} fallback questions`);

  return NextResponse.json(
    {
      success: true,
      questions: selectedQuestions,
      usedFallback: true,
      message: 'Using curated interview questions. Your interview is ready!'
    },
    { status: 200 }
  );
}