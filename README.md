# AI-Powered Interview Platform

## Overview
This project is an **AI-powered interview system** that simulates real-world interviews for candidates.  
It dynamically generates interview questions, collects user answers, evaluates them using AI, and provides scoring, feedback, and a hiring recommendation.

Built with:
- **Frontend:** Next.js + React + Tailwind CSS  
- **AI APIs:** Anthropic (Claude AI) for questions, Groq for evaluation  
- **Database:** Supabase for permanent storage  

---

## Features

1. **Dynamic AI Interview**
   - Generates interview questions based on:
     - Job Role  
     - Difficulty Level  
     - Interview Type (Technical / Behavioral / Mixed)  
   - Questions are generated in real-time using **Anthropic API**.  
   - Answers are collected via **text or voice input**.  

2. **Real-Time Evaluation**
   - Answers evaluated using **Groq API** with `llama-3.3-70b-versatile` model.  
   - Category-wise evaluation:
     - Technical Knowledge  
     - Problem Solving  
     - Communication & Clarity  
     - Behavioral Competency  
   - Returns **Overall Score**, strengths, improvements, and hiring recommendation.  

3. **Scoring and Feedback**
   - Score thresholds:
     | Score | Description | Hiring Recommendation |
     |-------|-------------|---------------------|
     | 85–100 | Exceptional STAR + metrics | Strong Yes |
     | 60–84  | Strong answers with examples | Yes |
     | 30–59  | Partial knowledge / incomplete | Maybe |
     | 0–29   | Vague or skipped answers | No |
   - Feedback is **brutally honest** based on actual answers.  

4. **Data Storage**
   - **Temporary:** Browser React state (`conversation[]`) stores AI questions and user answers during interview.  
   - **Permanent:** Supabase database stores:
     - Questions asked  
     - User answers  
     - Scores & feedback  
     - Timestamp & user info  

5. **Additional Features**
   - Contact form to send messages to admin  
   - Optional dashboard for reviewing previous interviews  

---

## How It Works

### Interview Flow
1. User selects **interview type, job role, and difficulty**  
2. User clicks **Start Interview**  
3. **Anthropic API** generates dynamic questions  
4. User answers questions; answers stored in `conversation[]` array  
5. After all questions, `buildPrompt()` formats the conversation and scoring rules  
6. **Groq API** evaluates answers and returns JSON:
   - Overall Score (0-100)  
   - Category-wise feedback  
   - Strengths & Improvements  
   - Hiring Recommendation  
7. Result displayed in frontend and optionally saved in Supabase  

---

### Groq API Evaluation Data Flow

- **Data Source:** Browser `conversation[]` array  
```json
conversation = [
  { "role": "assistant", "content": "Question 1..." },
  { "role": "user", "content": "Answer 1..." },
  ...
]
Data Sent to Groq: Formatted prompt containing all conversation + evaluation instructions
Groq JSON Response Example:
{
  "overallScore": 75,
  "overallFeedback": "Good technical knowledge...",
  "categories": [
    {
      "name": "Technical Knowledge",
      "score": 80,
      "feedback": "Understood core concepts...",
      "strengths": ["OOP explanation"],
      "improvements": ["Provide more examples"]
    }
  ],
  "strengths": ["Clear explanation of OOP"],
  "improvements": ["Practice system design examples"],
  "hiringRecommendation": "Yes"
}
Key Points:
Only actual conversation data is sent (no random data)
Temporary data stored in browser, permanent in Supabase
Example Scoring
User Score	Feedback Example	Hiring Recommendation
92	Excellent problem-solving with STAR examples	Strong Yes
75	Good answers, minor gaps	Yes
45	Partial answers, lacks depth	Maybe
20	Vague / one-word answers	No
5	Most questions skipped	No
Setup Instructions
Clone the repo:
git clone <repo-url>
cd <project-folder>
Install dependencies:
npm install
Create .env file:
ANTHROPIC_API_KEY=<your_anthropic_key>
GROQ_API_KEY=<your_groq_key>
SUPABASE_URL=<your_supabase_url>
SUPABASE_KEY=<your_supabase_key>
Run the project:
npm run dev
Open http://localhost:3000 in your browser

**Result according to score**
function getSkillStage(score: number | null) {
  if (!score || score === 0) return {
    stage: 'Unrated', level: 0, emoji: '⚪', color: 'text-gray-400',
    bg: 'bg-gray-500/10', border: 'border-gray-500/20', bar: 'bg-gray-500',
    icon: Target, tagline: 'No score available.', description: '',
  };
  if (score >= 85) return {
    stage: 'Expert', level: 5, emoji: '🏆', color: 'text-yellow-400',
    bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', bar: 'bg-yellow-400',
    icon: Trophy, tagline: 'You are interview-ready at an expert level.',
    description: 'Exceptional performance. You demonstrate mastery with depth, clarity and confidence.',
  };
  if (score >= 60) return {
    stage: 'Advanced', level: 4, emoji: '⭐', color: 'text-blue-400',
    bg: 'bg-blue-500/10', border: 'border-blue-500/30', bar: 'bg-blue-400',
    icon: Award, tagline: 'Strong candidate — minor polish needed.',
    description: 'Strong command of the subject with well-structured answers. A few refinements will take you to expert level.',
  };
  if (score >= 50) return {
    stage: 'Proficient', level: 3, emoji: '💡', color: 'text-green-400',
    bg: 'bg-green-500/10', border: 'border-green-500/30', bar: 'bg-green-400',
    icon: Zap, tagline: 'Solid foundation — keep building.',
    description: 'Clear grasp of core concepts with reasonable communication. Focused practice will elevate you significantly.',
  };
  if (score >= 15) return {
    stage: 'Developing', level: 2, emoji: '📈', color: 'text-orange-400',
    bg: 'bg-orange-500/10', border: 'border-orange-500/30', bar: 'bg-orange-400',
    icon: Star, tagline: 'On the right path — needs more depth.',
    description: 'Awareness of topics but answers need more structure, specifics, and confidence.',
  };
  return {
    stage: 'Beginner', level: 1, emoji: '🌱', color: 'text-red-400',
    bg: 'bg-red-500/10', border: 'border-red-500/30', bar: 'bg-red-400',
    icon: Brain, tagline: 'Early stage — great time to build habits.',
    description: 'Focus on learning frameworks, practicing out loud, and studying real examples.',
  };
}

