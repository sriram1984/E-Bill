//import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await dbConnect();
    const db = client.db(process.env.MONGODB_DB);
    const collections = await db.collections();
    console.log('??',client)

    return NextResponse.json({
      success: true,
      collections: collections.map((col) => col.collectionName),
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}
