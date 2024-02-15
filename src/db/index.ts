import mongoose, { Mongoose } from 'mongoose';

let db: Mongoose | null = null;

export async function connectToDatabase() {
  if (db) {
    return db;
  }

  db = await mongoose.connect('mongodb://localhost:27017/PayPal'!);

  return db;

}