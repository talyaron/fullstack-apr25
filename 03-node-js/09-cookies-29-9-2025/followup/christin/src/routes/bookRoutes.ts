import express from 'express';
import Book, { IBook } from '../models/Book.model';
const router = express.Router();

router.post('/add-book', async (req, res) => {
  try {
    const newBook: IBook = req.body;
    console.log('New Book:', newBook);

    const book = new Book(newBook);
    await book.save();
    res.send(book);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/books-by-user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {

   if(!userId) {
    return res.status(400).send('User ID is required');
   }

    const books = await Book.find({ userId }).populate('userId', 'name email');
    res.send(books);
  } catch (error) {
    console.error('Error fetching books by user:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;