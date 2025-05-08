import { NextResponse } from 'next/server';

export async function POST(req) {
  const { question } = await req.json();

  const API_KEY = process.env.GEMINI_API_KEY; 

  try {
    const result = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
        }),
      }
    );

    const data = await result.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ error: 'Failed to contact AI service' }, { status: 500 });
  }
}