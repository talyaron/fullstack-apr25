import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
};
console.log(dbConfig);
const DB_NAME = process.env.DB_NAME || 'library';

// SQL Queries
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``;

const dropBooksTableQuery = `DROP TABLE IF EXISTS \`books\``;
const dropAuthorsTableQuery = `DROP TABLE IF EXISTS \`authors\``;

const createAuthorsTableQuery = `
  CREATE TABLE \`authors\` (
    \`author_id\` INT NOT NULL AUTO_INCREMENT,
    \`first_name\` VARCHAR(100) NOT NULL,
    \`last_name\` VARCHAR(100) NOT NULL,
    \`date_of_birth\` DATE,
    \`date_of_death\` DATE,
    PRIMARY KEY (\`author_id\`)
  )
`;

const createBooksTableQuery = `
  CREATE TABLE \`books\` (
    \`book_id\` INT NOT NULL AUTO_INCREMENT,
    \`title\` VARCHAR(255) NOT NULL,
    \`publication_year\` YEAR,
    \`isbn\` VARCHAR(13) UNIQUE,
    \`author_id\` INT,
     \`genre_id\` INT,

    PRIMARY KEY (\`book_id\`),
    CONSTRAINT \`fk_author\`
      FOREIGN KEY (\`author_id\`)
      REFERENCES \`authors\` (\`author_id\`)
      ON DELETE RESTRICT
      ON UPDATE CASCADE,
    CONSTRAINT \`fk_genre\`
      FOREIGN KEY (\`genre_id\`)
      REFERENCES \`genres\` (\`genre_id\`)
      ON DELETE RESTRICT
      ON UPDATE CASCADE
  )
`;
const createGenresTableQuery = `
  CREATE TABLE \`genres\` (
    \`genre_id\` INT NOT NULL AUTO_INCREMENT,
    \`name\` VARCHAR(25) NOT NULL,
     PRIMARY KEY (\`genre_id\`)
  )
`;

const insertAuthorsQuery = `
  INSERT INTO \`authors\` (first_name, last_name, date_of_birth, date_of_death)
  VALUES
    ('Stephen', 'King', '1947-09-21', NULL),
    ('Agatha', 'Christie', '1890-09-15', '1976-01-12'),
    ('Gabriel', 'Garcia Marquez', '1927-03-06', '2014-04-17'),
    ('Harper', 'Lee', '1926-04-28', '2016-02-19'),
    ('Neil', 'Gaiman', '1960-11-10', NULL)
`;

const insertGenresQuery = `
  INSERT INTO \`genres\` (name)
  VALUES
    ('horror'),
    ('romance'),
    ('fiction')
`;

const insertBooksQuery = `
  INSERT INTO \`books\` (title, publication_year, isbn, author_id, genre_id)
  VALUES
    ('The Shining', 1977, '9780385121675', 1, 2),
    ('It', 1986, '9780670813025', 1,1),
    ('Murder on the Orient Express', 1934, '9780062073501', 2,1),
    ('And Then There Were None', 1939, '9780062073488', 2,2),
    ('One Hundred Years of Solitude', 1967, '9780060883287', 3,2),
    ('Love in the Time of Cholera', 1985, '9780307389732', 3,3),
    ('To Kill a Mockingbird', 1960, '9780061120084', 4,1),
    ('Go Set a Watchman', 2015, '9780062400926', 4,2),
    ('American Gods', 2001, '9780062562471', 5,3),
    ('Coraline', 2002, '9780380807345', 5,2),
    ('Unknown Author Book', 2005, '9780000000001', NULL, 1)
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

    // Drop existing tables (in correct order due to foreign key)
    await connection.execute(dropBooksTableQuery);
    console.log('✅ Dropped existing "books" table (if existed).');

    await connection.execute(dropAuthorsTableQuery);
    console.log('✅ Dropped existing "authors" table (if existed).');

    // Create tables
    await connection.execute(createAuthorsTableQuery);
    console.log('✅ Created "authors" table.');
 await connection.execute(createGenresTableQuery);
    console.log('✅ Created "genres" table.');

    await connection.execute(createBooksTableQuery);
    console.log('✅ Created "books" table with foreign key to authors.');

    // Seed data
    await connection.execute(insertAuthorsQuery);
    console.log('✅ Inserted 5 authors.');

    await connection.execute(insertGenresQuery);
    console.log('✅ Inserted 3 genres.');

    await connection.execute(insertBooksQuery);
    console.log('✅ Inserted 11 books.');

    // Verify data
    const [authors] = await connection.execute('SELECT COUNT(*) as count FROM authors');
    const [books] = await connection.execute('SELECT COUNT(*) as count FROM books');

    console.log('\n━'.repeat(40));
    console.log('📊 Database initialized successfully!');
    console.log(`   📚 Authors: ${(authors as any)[0].count}`);
    console.log(`   📖 Books: ${(books as any)[0].count}`);
    console.log('━'.repeat(40) + '\n');

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
