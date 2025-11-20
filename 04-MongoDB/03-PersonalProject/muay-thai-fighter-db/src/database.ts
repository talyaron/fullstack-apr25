import {MongoClient, Db} from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env file');
}

const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase() {
    try {
   await client.connect();
    db = client.db('muay-thai-fighters');
    console.log('✅Connected to MongoDB');
    return db;
    } catch (error) {
        console.error('❌Failed to connect to MongoDB', error);
        throw error;
    }
}

export function getDatabase() {
    if (!db) {
      throw new Error('Database not connected. Call connectToDatabase first.');   
    }
    return db;
}   

export async function closeDatabase() {
    await client.close();
    console.log('🔒Closed MongoDB connection');
}