import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI missing");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(MONGODB_URI, {
    dbName: "careplus",
  });

  isConnected = true;
}
