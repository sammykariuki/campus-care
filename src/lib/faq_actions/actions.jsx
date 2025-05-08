"use server";

import { createFaq } from "../faq";
import { redirect } from "next/navigation";
import db from "../db";
import { cookies } from "next/headers";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function createFaqAction(prevState, formData) {
    const token = (await cookies()).get('session')?.value;

    if (!token) {
        return { message: 'Unauthorized: Please login.'};
    }

    const session = db.prepare('SELECT * FROM sessions WHERE token = ?').get(token);
    if (!session) {
        return { message: 'Invalid session. Please log in again'};
    }
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(session.user_id);
    if (user.role === 'anonymous') {
        return { message: 'Anonymous users are not allowed to submit faq.'};
    }

    const rawQuestion = formData.get('question') || '';
    const rawAnswer = formData.get('answer') || '';
    const question = rawQuestion.trim().replace(/\?+$/, '') + '?';
    const answer = rawAnswer.trim();
  
  
    if (isInvalidText(question) || isInvalidText(answer)) {
      return {
        message: 'Invalid input.',
        question,
        answer
      };
    }
  
    await createFaq({ question, answer });
    redirect("/admin/faq");
}