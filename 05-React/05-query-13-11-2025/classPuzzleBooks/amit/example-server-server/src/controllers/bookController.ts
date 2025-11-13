import { Request, Response } from 'express';
import Book, { IBook } from '../models/Book';
import mongoose from 'mongoose';

// Get all books for the authenticated user
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Find all books for the user, sorted by creation date (newest first)
    const books = await Book.find({ userId, }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      books
    });

  } catch (error: any) {
    console.error('Get books error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books'
    });
  }
};

// Get a single book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Validate book ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
      return;
    }

    // Find book by ID and ensure it belongs to the user
    const book = await Book.findOne({ _id: id, userId });

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      book
    });

  } catch (error: any) {
    console.error('Get book by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch book'
    });
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { title, author, description, year } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Validate required fields
    if (!title || !author) {
      res.status(400).json({
        success: false,
        message: 'Title and author are required'
      });
      return;
    }

    // Create new book
    const book = await Book.create({
      title,
      author,
      description,
      year,
      userId
    });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      book
    });

  } catch (error: any) {
    console.error('Create book error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        message: messages.join('. ')
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create book'
    });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const updates = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Validate book ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
      return;
    }

    // Don't allow updating userId
    delete updates.userId;

    // Find and update book
    const book = await Book.findOneAndUpdate(
      { _id: id, userId },
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      book
    });

  } catch (error: any) {
    console.error('Update book error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      res.status(400).json({
        success: false,
        message: messages.join('. ')
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update book'
    });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
      return;
    }

    // Validate book ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
      return;
    }

    // Find and delete book
    const book = await Book.findOneAndDelete({ _id: id, userId });

    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      book
    });

  } catch (error: any) {
    console.error('Delete book error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete book'
    });
  }
};