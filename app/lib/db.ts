import { Mongoose } from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: Cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = import('mongoose').then(async (mongoose) => {
      try {
        const conn = await mongoose.default.connect(MONGODB_URI, opts);
        console.log('Connected to MongoDB');
        return conn;
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;