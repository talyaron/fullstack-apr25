import { Request, Response, Router } from "express"
import pool from "../db";
import { RowDataPacket } from "mysql2";
import { Author } from "../types";

const router = Router()
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string | undefined;
    const sortBy = req.query.sortBy === 'count' ? 'book_count' : 'a.first_name';
    const sortOrder = req.query.order === 'desc' ? 'DESC' : 'ASC';

    const values: any[] = [];
    let whereClause = '';

    if (search) {
      whereClause = 'WHERE a.first_name LIKE ?';
      values.push(`${search}%`);
    }

    const sql = `
      SELECT
        a.author_id,
        a.first_name,
        a.last_name,
        COUNT(b.book_id) AS book_count
      FROM authors AS a
      JOIN books AS b ON a.author_id = b.author_id
      ${whereClause}
      GROUP BY a.author_id, a.first_name, a.last_name
      ORDER BY ${sortBy} ${sortOrder}
    `;

    const [rows] = await pool.query<RowDataPacket[]>(sql, values);
    res.json(rows);

  } catch (error) {
    console.error('Error fetching authors stats:', error);
    res.status(500).json({ message: 'Failed to fetch authors' });
  }
});


export default router;
