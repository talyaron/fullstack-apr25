import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678', // Add your password here
};

const DB_NAME = process.env.DB_NAME || 'new_library';

const queries = {
  createDB: `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``,
  dropBooks: `DROP TABLE IF EXISTS \`books\``,
  dropAuthors: `DROP TABLE IF EXISTS \`authors\``,
  createAuthors: `
    CREATE TABLE \`authors\` (
      \`author_id\` INT NOT NULL AUTO_INCREMENT,
      \`first_name\` VARCHAR(100) NOT NULL,
      \`last_name\` VARCHAR(100) NOT NULL,
      PRIMARY KEY (\`author_id\`)
    )`,
  createBooks: `
    CREATE TABLE \`books\` (
      \`book_id\` INT NOT NULL AUTO_INCREMENT,
      \`title\` VARCHAR(255) NOT NULL,
      \`author_id\` INT,
      PRIMARY KEY (\`book_id\`),
      CONSTRAINT \`fk_author\` FOREIGN KEY (\`author_id\`)
      REFERENCES \`authors\` (\`author_id\`) ON DELETE SET NULL
    )`,
  seedAuthors: `
    INSERT INTO \`authors\` (first_name, last_name) VALUES
    ('Stephen', 'King'), ('Agatha', 'Christie'), ('J.K.', 'Rowling'),
    ('George', 'Orwell'), ('Ernest', 'Hemingway'), ('Toni', 'Morrison')`,
  seedBooks: `
    INSERT INTO \`books\` (title, author_id) VALUES
    ('The Shining', 1), ('It', 1), ('Misery', 1), ('The Stand', 1),
    ('Murder on the Orient Express', 2), ('Death on the Nile', 2),
    ('Harry Potter', 3), ('1984', 4), ('Animal Farm', 4),
    ('The Old Man and the Sea', 5), ('Beloved', 6)`
};

async function init() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    console.log('🛠️  Initializing Library Stats Database...');

    await conn.query(queries.createDB);
    await conn.changeUser({ database: DB_NAME });

    await conn.query(queries.dropBooks);
    await conn.query(queries.dropAuthors);

    await conn.query(queries.createAuthors);
    await conn.query(queries.createBooks);

    await conn.query(queries.seedAuthors);
    await conn.query(queries.seedBooks);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Init failed:', err);
    process.exit(1);
  }
}

init();
