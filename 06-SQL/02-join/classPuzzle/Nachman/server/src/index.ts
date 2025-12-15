import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authorsRouter from './routes/authors.js';
import booksRouter from './routes/books.js';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'Library API is running' });
});

async function startServer() {
  console.log('\n🚀 Starting Library Server...\n');

  // Test database connection
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    console.log(`   📚 Database: ${process.env.DB_NAME || 'library'}`);
    console.log(`   🖥️  Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    connection.release();
  } catch (error) {
    console.log('❌ Database connection failed!');
    console.log(`   💥 Error: ${(error as Error).message}`);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`\n🌐 Server running on http://localhost:${PORT}`);
    console.log('📡 API endpoints:');
    console.log('   - /api/authors');
    console.log('   - /api/books\n');
    console.log('━'.repeat(40));
    console.log('🎉 Ready to accept requests!\n');
  });
}

startServer();
