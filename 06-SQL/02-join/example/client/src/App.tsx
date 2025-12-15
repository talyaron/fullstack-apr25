import { useState, useEffect } from 'react';
import type { Author, AuthorInput, BookWithAuthor, BookInput } from './types';
import { getAuthors, createAuthor, updateAuthor, deleteAuthor, getBooks, createBook, updateBook, deleteBook } from './api';
import { AuthorList } from './components/AuthorList';
import { AuthorForm } from './components/AuthorForm';
import { BookList } from './components/BookList';
import { BookForm } from './components/BookForm';
import './App.css';

type View = 'authors' | 'books';
type FormMode = 'none' | 'author' | 'book';

function App() {
  const [view, setView] = useState<View>('books');
  const [formMode, setFormMode] = useState<FormMode>('none');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [books, setBooks] = useState<BookWithAuthor[]>([]);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [editingBook, setEditingBook] = useState<BookWithAuthor | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
      setError(null);
    } catch {
      setError('Failed to load authors. Make sure the server is running.');
    }
  };

  const loadBooks = async () => {
    try {
      console.log("load books")
      const data = await getBooks();
      setBooks(data);
      setError(null);
    } catch {
      setError('Failed to load books. Make sure the server is running.');
    }
  };

  useEffect(() => {
    console.log("initlize")
    loadAuthors();
    loadBooks();
  }, []);

  // Author handlers
  const handleAddAuthor = () => {
    setEditingAuthor(null);
    setFormMode('author');
  };

  const handleEditAuthor = (author: Author) => {
    setEditingAuthor(author);
    setFormMode('author');
  };

  const handleDeleteAuthor = async (id: number) => {
    if (!confirm('Are you sure you want to delete this author?')) return;
    try {
      await deleteAuthor(id);
      loadAuthors();
      loadBooks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete author');
    }
  };

  const handleAuthorSubmit = async (data: AuthorInput) => {
    try {
      if (editingAuthor) {
        await updateAuthor(editingAuthor.author_id, data);
      } else {
        await createAuthor(data);
      }
      setFormMode('none');
      setEditingAuthor(null);
      loadAuthors();
      loadBooks();
    } catch {
      setError('Failed to save author');
    }
  };

  // Book handlers
  const handleAddBook = () => {
    setEditingBook(null);
    setFormMode('book');
  };

  const handleEditBook = (book: BookWithAuthor) => {
    setEditingBook(book);
    setFormMode('book');
  };

  const handleDeleteBook = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id);
      loadBooks();
    } catch {
      setError('Failed to delete book');
    }
  };

  const handleBookSubmit = async (data: BookInput) => {
    try {
      if (editingBook) {
        await updateBook(editingBook.book_id, data);
      } else {
        await createBook(data);
      }
      setFormMode('none');
      setEditingBook(null);
      loadBooks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save book');
    }
  };

  const handleCancel = () => {
    setFormMode('none');
    setEditingAuthor(null);
    setEditingBook(null);
  };

  return (
    <div className="app">
      <h1>Library Management</h1>

      {error && <div className="error">{error}</div>}

      <div className="tabs">
        <button
          className={view === 'books' ? 'active' : ''}
          onClick={() => { setView('books'); setFormMode('none'); }}
        >
          Books
        </button>
        <button
          className={view === 'authors' ? 'active' : ''}
          onClick={() => { setView('authors'); setFormMode('none'); }}
        >
          Authors
        </button>
      </div>

      {formMode === 'author' && (
        <AuthorForm
          author={editingAuthor}
          onSubmit={handleAuthorSubmit}
          onCancel={handleCancel}
        />
      )}

      {formMode === 'book' && (
        <BookForm
          book={editingBook}
          authors={authors}
          onSubmit={handleBookSubmit}
          onCancel={handleCancel}
        />
      )}

      {formMode === 'none' && view === 'authors' && (
        <>
          <button onClick={handleAddAuthor} className="add-btn">Add Author</button>
          <AuthorList
            authors={authors}
            onEdit={handleEditAuthor}
            onDelete={handleDeleteAuthor}
          />
        </>
      )}

      {formMode === 'none' && view === 'books' && (
        <>
          <button onClick={handleAddBook} className="add-btn">Add Book</button>
          <BookList
            books={books}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
          />
        </>
      )}
    </div>
  );
}

export default App;
