// app/api/upload/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('excel_data');

    const result = await collection.insertMany(data);

    return NextResponse.json({ success: true, inserted: result.insertedCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
