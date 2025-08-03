import { NextResponse } from 'next/server';
// import clientPromise from '@/lib/mongodb';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect(); // Sets up connection
    const db = mongoose.connection; 
    const collection = db.collection('excel_data'); // or your collection name
    console.log('collection')
    const data = await collection.find({}).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch data' }, { status: 500 });
  }
}
