import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
};

const DB_NAME = process.env.DB_NAME || 'library_db';

// SQL Queries
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``;

const dropTablesQuery = `
  DROP TABLE IF EXISTS \`books\`;
  DROP TABLE IF EXISTS \`authors\`;
  DROP TABLE IF EXISTS \`genres\`;
`;

const createGenresTableQuery = `
  CREATE TABLE \`genres\` (
    \`genre_id\` INT PRIMARY KEY AUTO_INCREMENT,
    \`name\` VARCHAR(100) NOT NULL UNIQUE,
    \`description\` TEXT
  )
`;

const createAuthorsTableQuery = `
  CREATE TABLE \`authors\` (
    \`author_id\` INT PRIMARY KEY AUTO_INCREMENT,
    \`name\` VARCHAR(255) NOT NULL,
    \`bio\` TEXT,
    \`birth_year\` INT
  )
`;

const createBooksTableQuery = `
  CREATE TABLE \`books\` (
    \`book_id\` INT PRIMARY KEY AUTO_INCREMENT,
    \`title\` VARCHAR(255) NOT NULL,
    \`author_id\` INT NOT NULL,
    \`genre_id\` INT,
    \`publication_year\` INT,
    \`isbn\` VARCHAR(20),
    FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`author_id\`) ON DELETE CASCADE,
    FOREIGN KEY (\`genre_id\`) REFERENCES \`genres\`(\`genre_id\`) ON DELETE SET NULL
  )
`;

const insertGenresQuery = `
  INSERT INTO \`genres\` (name, description) VALUES
    ('Fiction', 'Literary works of imaginative narration'),
    ('Science Fiction', 'Speculative fiction based on scientific concepts'),
    ('Fantasy', 'Fiction with magical or supernatural elements'),
    ('Mystery', 'Fiction dealing with puzzling crimes or secrets'),
    ('Thriller', 'Fast-paced fiction designed to hold readers in suspense'),
    ('Romance', 'Fiction focused on romantic relationships'),
    ('Historical Fiction', 'Fiction set in the past'),
    ('Non-Fiction', 'Factual prose writing'),
    ('Biography', 'Written account of someone\\'s life'),
    ('Self-Help', 'Books offering advice for personal improvement')
`;

const insertAuthorsQuery = `
  INSERT INTO \`authors\` (name, bio, birth_year) VALUES
    ('J.K. Rowling', 'British author best known for the Harry Potter series', 1965),
    ('George Orwell', 'English novelist and essayist', 1903),
    ('Jane Austen', 'English novelist known for romantic fiction', 1775),
    ('Isaac Asimov', 'American science fiction writer', 1920),
    ('Agatha Christie', 'English detective novelist', 1890)
`;

const insertBooksQuery = `
  INSERT INTO \`books\` (title, author_id, genre_id, publication_year, isbn) VALUES
    ('Harry Potter and the Philosopher\\'s Stone', 1, 3, 1997, '978-0439708180'),
    ('1984', 2, 2, 1949, '978-0451524935'),
    ('Animal Farm', 2, 1, 1945, '978-0452284244'),
    ('Pride and Prejudice', 3, 6, 1813, '978-0141439518'),
    ('Foundation', 4, 2, 1951, '978-0553293357'),
    ('I, Robot', 4, 2, 1950, '978-0553382563'),
    ('Murder on the Orient Express', 5, 4, 1934, '978-0062693662'),
    ('And Then There Were None', 5, 4, 1939, '978-0062073488')
`;

const verifyCountsQuery = `
  SELECT 'Genres' as Table_Name, COUNT(*) as Count FROM genres
  UNION ALL
  SELECT 'Authors', COUNT(*) FROM authors
  UNION ALL
  SELECT 'Books', COUNT(*) FROM books
`;

const verifyBooksQuery = `
  SELECT 
    b.book_id,
    b.title,
    a.name as author_name,
    g.name as genre_name,
    b.publication_year,
    b.isbn
  FROM books b
  JOIN authors a ON b.author_id = a.author_id
  LEFT JOIN genres g ON b.genre_id = g.genre_id
  ORDER BY b.title
`;

async function initializeDatabase() {
  let connection;

  try {
    // Connect without database first to create it
    connection = await mysql.createConnection(dbConfig);
    console.log('\n🚀 Starting database initialization...\n');

    // Create database
    await connection.execute(createDatabaseQuery);
    console.log(`✅ Database "${DB_NAME}" created or verified.`);

    // Switch to the database
    await connection.changeUser({ database: DB_NAME });
    console.log(`✅ Connected to "${DB_NAME}" database.`);

    // Drop existing tables (in correct order due to foreign keys)
    await connection.execute('DROP TABLE IF EXISTS `books`');
    console.log('✅ Dropped existing "books" table (if existed).');
    
    await connection.execute('DROP TABLE IF EXISTS `authors`');
    console.log('✅ Dropped existing "authors" table (if existed).');
    
    await connection.execute('DROP TABLE IF EXISTS `genres`');
    console.log('✅ Dropped existing "genres" table (if existed).');

    // Create tables in correct order
    await connection.execute(createGenresTableQuery);
    console.log('✅ Created "genres" table.');

    await connection.execute(createAuthorsTableQuery);
    console.log('✅ Created "authors" table.');

    await connection.execute(createBooksTableQuery);
    console.log('✅ Created "books" table with foreign keys.');

    // Seed data
    await connection.execute(insertGenresQuery);
    console.log('✅ Inserted 10 genres.');

    await connection.execute(insertAuthorsQuery);
    console.log('✅ Inserted 5 authors.');

    await connection.execute(insertBooksQuery);
    console.log('✅ Inserted 8 books.');

    // Verify data with counts
    const [counts] = await connection.execute(verifyCountsQuery);
    console.log('\n━'.repeat(40));
    console.log('📊 Database initialized successfully!');
    console.log('\n📈 Table Counts:');
    (counts as any[]).forEach((row: any) => {
      console.log(`   ${row.Table_Name}: ${row.Count}`);
    });

    // Display sample books data
    const [books] = await connection.execute(verifyBooksQuery);
    console.log('\n📚 Books in database:');
    (books as any[]).forEach((book: any) => {
      console.log(`   • "${book.title}" by ${book.author_name} (${book.genre_name}) - ${book.publication_year}`);
    });
    
    console.log('\n' + '━'.repeat(40) + '\n');

  } catch (error) {
    console.error('\n❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initializeDatabase();