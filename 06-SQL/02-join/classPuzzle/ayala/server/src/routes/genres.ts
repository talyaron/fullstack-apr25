import { Router, Request, Response } from 'express';
import pool from '../db.js';
import { Book, BookInput, BookWithAuthor } from '../types.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = Router();

// Get books by gentes
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
        a.first_name AS author_first_name,
        a.last_name AS author_last_name,
        g.name AS genre_name
      FROM books b
      LEFT JOIN genres g ON b.genre_id = g.genre_id
      LEFT JOIN authors a ON b.author_id = a.author_id
      WHERE b.genre_id = ?
    `,[req.params.id]);
    res.json(rows as BookWithAuthor[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get book by ID with author info
router.get('/', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(`
SELECT * FROM library.genres
    `);
    if (rows.length === 0) {
      res.status(404).json({ error: 'genress not found' });
      return;
    }
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

export default router;
