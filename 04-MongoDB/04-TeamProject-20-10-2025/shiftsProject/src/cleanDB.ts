import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/users.model';
import connectDB from './config/db';

dotenv.config();

// ===============================================
// CLEAN DATABASE SCRIPT
// ===============================================

async function cleanDatabase() {
  try {
    await connectDB();

    console.log('🗑️  Starting database cleanup...');

    // אופציה 1: מחיקת כל המשתמשים
    const deleteResult = await User.deleteMany({});
    console.log(`✅ Deleted ${deleteResult.deletedCount} users`);

    // אופציה 2: מחיקת משתמש ספציפי לפי username
    // const deleteResult = await User.deleteOne({ username: 'ari71232@outlook.com' });
    // console.log(`✅ Deleted user: ari71232@outlook.com`);

    console.log('✅ Database cleanup completed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    process.exit(1);
  }
} 

cleanDatabase();