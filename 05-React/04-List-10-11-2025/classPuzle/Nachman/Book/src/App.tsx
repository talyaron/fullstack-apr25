import React, { useState } from 'react';
import Book from './view/components/Book/book';
import './App.module.scss';

interface BookType {
  id: number;
  title: string;
  imgUrl: string;
  yearOfPublication: number;
}

const initialBooks: BookType[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    imgUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    yearOfPublication: 1925
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    imgUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    yearOfPublication: 1960
  },
  {
    id: 3,
    title: "1984",
    imgUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    yearOfPublication: 1949
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    imgUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    yearOfPublication: 1813
  }
];

const App: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>(initialBooks);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = () => {
    if (!title || !imgUrl || !year) {
      alert('Please fill in all fields');
      return;
    }

    const newBook: BookType = {
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
      title,
      imgUrl,
      yearOfPublication: parseInt(year)
    };

    setBooks([...books, newBook]);
    setTitle('');
    setImgUrl('');
    setYear('');
  };

  return (
    <div className="app">
      <h1 className="app-title">Book Library</h1>
      
      <div className="book-grid">
        {books.map(book => (
          <Book key={book.id} book={book} />
        ))}
      </div>

      <div className="form-container">
        <h2 className="form-title">Add New Book</h2>
        <div className="book-form">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Year of Publication"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="form-input"
          />
          <button onClick={handleSubmit} className="form-button">
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;