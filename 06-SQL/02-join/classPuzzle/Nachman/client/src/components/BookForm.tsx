import { useState, useEffect } from 'react';
import type { Author, BookWithAuthor, BookInput } from '../types';

interface BookFormProps {
  book?: BookWithAuthor | null;
  authors: Author[];
  onSubmit: (book: BookInput) => void;
  onCancel: () => void;
}

export function BookForm({ book, authors, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<BookInput>({
    title: '',
    publication_year: null,
    isbn: null,
    author_id: null,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        publication_year: book.publication_year,
        isbn: book.isbn,
        author_id: book.author_id,
      });
    }
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="data-form">
      <h2>{book ? 'Edit Book' : 'Add Book'}</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="author_id">Author</label>
        <select
          id="author_id"
          value={formData.author_id || ''}
          onChange={(e) => setFormData({ ...formData, author_id: e.target.value ? parseInt(e.target.value) : null })}
        >
          <option value="">-- No Author --</option>
          {authors.map((author) => (
            <option key={author.author_id} value={author.author_id}>
              {author.first_name} {author.last_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="publication_year">Publication Year</label>
        <input
          id="publication_year"
          type="number"
          min="1000"
          max="9999"
          value={formData.publication_year || ''}
          onChange={(e) => setFormData({ ...formData, publication_year: e.target.value ? parseInt(e.target.value) : null })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="isbn">ISBN</label>
        <input
          id="isbn"
          type="text"
          maxLength={13}
          value={formData.isbn || ''}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value || null })}
        />
      </div>
      <div className="form-actions">
        <button type="submit">{book ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
