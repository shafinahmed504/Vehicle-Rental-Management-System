import { MongoClient } from 'mongodb';
import dotenv from "dotenv"

dotenv.config()

export const client = new MongoClient(`${process.env.MONGODB_CONNECTION_STRING}`);

export const db=client.db(`${process.env.DB_NAME}`)

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}