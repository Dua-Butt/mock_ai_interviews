import { getRandomInterviewCover } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    // 1️⃣ Generate interview questions using Grok AI (X.AI)
    const prompt = `Prepare questions for a job interview.
Role: ${role}
Level: ${level}
Tech stack: ${techstack}
Focus: ${type}
Amount: ${amount}

Generate exactly ${amount} interview questions that are:
- Relevant to the ${role} position
- Appropriate for ${level} experience level
- Focused on ${type} interview style
- Related to the tech stack: ${techstack}

Return ONLY a JSON array of question strings like this (no markdown, no code blocks):
["Question 1", "Question 2", "Question 3"]`;

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          {
            role: 'system',
            content: 'You are an expert technical interviewer. Generate interview questions and respond ONLY with a valid JSON array of strings. No markdown, no explanation, just the raw JSON array.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Grok API Error:', response.status, errorText);
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Clean the response (remove markdown if present)
    let cleanedResponse = aiResponse.trim();
    cleanedResponse = cleanedResponse.replace(/```json\n?/g, '');
    cleanedResponse = cleanedResponse.replace(/```\n?/g, '');
    cleanedResponse = cleanedResponse.trim();

    // Parse JSON array
    let questions: string[];
    try {
      questions = JSON.parse(cleanedResponse);

      if (!Array.isArray(questions)) {
        throw new Error('Response is not an array');
      }
    } catch (parseError) {
      console.error('Failed to parse Grok response:', cleanedResponse);
      throw new Error('Invalid JSON response from Grok AI');
    }

    // 2️⃣ Prepare interview object
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(",").map((t: string) => t.trim()),
      questions,
      user_id: userid,
      finalized: true,
      cover_image: getRandomInterviewCover(),
      created_at: new Date().toISOString(),
    };

    // 3️⃣ Insert into Supabase
    const supabase = await createClient();
    const { error } = await supabase.from("interviews").insert([interview]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error generating questions:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ success: true, data: "VAPI Generate API is ready" }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}