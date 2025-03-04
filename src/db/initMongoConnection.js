import mongoose from 'mongoose';
import 'dotenv/config';
const URL_DB = process.env.URL_DB;

if (!URL_DB) {
  throw new Error('❌ MONGO_URI is not defined in .env file!');
}

export async function initMongoConnection() {
  try {
    await mongoose.connect(URL_DB);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}
