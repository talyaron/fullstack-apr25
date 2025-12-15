import { Router, Request, Response } from 'express';
import pool from '../db.js';
import { Book, BookInput, BookWithAuthor } from '../types.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = Router();

// Get all books with author info and optional genre filter
router.get('/', async (req: Request, res: Response) => {
  try {
    const genreId = req.query.genre_id;
    
    let query = `
      SELECT
        b.book_id,
        b.title,
        b.publication_year,
        b.isbn,
        b.author_id,
        b.genre_id,
        a.name AS author_name,
        g.name AS genre_name
      FROM books b
      JOIN authors a ON b.author_id = a.author_id
      LEFT JOIN genres g ON b.genre_id = g.genre_id
    `;
    
    const params: any[] = [];
    
    // Add genre filter if provided
    if (genreId) {
      query += ' WHERE b.genre_id = ?';
      params.push(genreId);
    }
    
    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    res.json(rows as BookWithAuthor[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get book by ID with author info
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT
        b.book_id,
        b.title,
        b.publication_year,
        b.isbn,
        b.author_id,
        b.genre_id,
        a.name AS author_name,
        g.name AS genre_name
      FROM books b
      JOIN authors a ON b.author_id = a.author_id
      LEFT JOIN genres g ON b.genre_id = g.genre_id
      WHERE b.book_id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json(rows[0] as BookWithAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Create book
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, publication_year, isbn, author_id, genre_id }: BookInput = req.body;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO books (title, publication_year, isbn, author_id, genre_id) VALUES (?, ?, ?, ?, ?)',
      [title, publication_year || null, isbn || null, author_id, genre_id || null]
    );
    const newBook: Book = {
      book_id: result.insertId,
      title,
      publication_year: publication_year || null,
      isbn: isbn || null,
      author_id,
      genre_id: genre_id || null,
    };
    res.status(201).json(newBook);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'ISBN already exists' });
      return;
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      res.status(400).json({ error: 'Invalid author_id' });
      return;
    }
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// Update book
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, publication_year, isbn, author_id, genre_id }: BookInput = req.body;
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE books SET title = ?, publication_year = ?, isbn = ?, author_id = ?, genre_id = ? WHERE book_id = ?',
      [title, publication_year || null, isbn || null, author_id, genre_id || null, req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.json({ book_id: parseInt(req.params.id), title, publication_year, isbn, author_id, genre_id });
  } catch (error: any) {
    console.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'ISBN already exists' });
      return;
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      res.status(400).json({ error: 'Invalid author_id' });
      return;
    }
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Delete book
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM books WHERE book_id = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

export default router;