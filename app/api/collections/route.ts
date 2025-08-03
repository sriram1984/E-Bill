import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    const db = mongoose.connection.db;

    if (!db) {
      return new Response(JSON.stringify({ error: 'Database connection not ready' }), { status: 500 });
    }

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    return new Response(JSON.stringify({ collections: collectionNames }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching collections:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch collection names' }), {
      status: 500,
    });
  }
}
