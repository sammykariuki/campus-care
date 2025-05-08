import db from '@/lib/db';
import { cookies } from 'next/headers';



export async function GET(request) {
    const cookieStore = (await cookies());
    const token = cookieStore.get('session')?.value;
    // look up current user
    const session = db.prepare("SELECT user_id FROM sessions WHERE token = ?").get(token);
    const meId = session?.user_id;
    const admins = db
      .prepare("SELECT id, email, role FROM users WHERE role = 'admin' AND id != ?")
      .all(meId);
    return Response.json(admins);
  }