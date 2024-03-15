import { connect as _connect, Mongoose } from "mongoose";

const DB_URI = process.env.MONGODB_URI;

export default async function connectDb(): Promise<Mongoose> {
  if (!DB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }
  try {
    const connect = await _connect(DB_URI);
    console.log(`MongoDB Connected`);
    return connect;
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
}
