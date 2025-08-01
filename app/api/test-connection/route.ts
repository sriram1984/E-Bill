import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collections = await db.collections();

    return NextResponse.json({
      success: true,
      collections: collections.map((col) => col.collectionName),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
