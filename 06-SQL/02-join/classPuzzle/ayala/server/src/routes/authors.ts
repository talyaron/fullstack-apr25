import { Router, Request, Response } from 'express';
import pool from '../db.js';
import { Author, AuthorInput } from '../types.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const router = Router();

// Get all authors
router.get('/', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM authors');
    res.json(rows as Author[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
});

// Get author by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM authors WHERE author_id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }
    res.json(rows[0] as Author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch author' });
  }
});

// Create author
router.post('/', async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, date_of_birth, date_of_death }: AuthorInput = req.body;
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO authors (first_name, last_name, date_of_birth, date_of_death) VALUES (?, ?, ?, ?)',
      [first_name, last_name, date_of_birth || null, date_of_death || null]
    );
    const newAuthor: Author = {
      author_id: result.insertId,
      first_name,
      last_name,
      date_of_birth: date_of_birth || null,
      date_of_death: date_of_death || null,
    };
    res.status(201).json(newAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create author' });
  }
});

// Update author
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, date_of_birth, date_of_death }: AuthorInput = req.body;
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE authors SET first_name = ?, last_name = ?, date_of_birth = ?, date_of_death = ? WHERE author_id = ?',
      [first_name, last_name, date_of_birth || null, date_of_death || null, req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }
    res.json({ author_id: parseInt(req.params.id), first_name, last_name, date_of_birth, date_of_death });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update author' });
  }
});

// Delete author
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM authors WHERE author_id = ?',
      [req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      res.status(400).json({ error: 'Cannot delete author with associated books' });
      return;
    }
    res.status(500).json({ error: 'Failed to delete author' });
  }
});

export default router;
