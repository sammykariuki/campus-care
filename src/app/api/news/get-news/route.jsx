import db from '@/lib/db';

export async function GET() {
    try {
        const news = db.prepare('SELECT * FROM news').all();
        return Response.json(news);
    } catch(err) {
        console.error('Error fetching news', err);
    }
}