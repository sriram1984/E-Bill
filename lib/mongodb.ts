// lib/mongodb.ts

// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI!;
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri, options);
//   global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// export default clientPromise;
// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/** Global is used here to maintain a cached connection during hot reloads in development */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
