// app/api/upload/route.ts

import { NextResponse } from 'next/server';
//import clientPromise from '@/lib/mongodb';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await dbConnect(); // Sets up connection
    const db = mongoose.connection; 
    const collection = db.collection('excel_data');

    const result = await collection.insertMany(data);

    return NextResponse.json({ success: true, inserted: result.insertedCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}


