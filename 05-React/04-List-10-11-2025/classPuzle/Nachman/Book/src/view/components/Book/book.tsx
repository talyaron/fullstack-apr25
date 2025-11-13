import React from 'react';
import './book.scss';

interface BookType {
  id: number;
  title: string;
  imgUrl: string;
  yearOfPublication: number;
}

interface BookProps {
  book: BookType;
}

const Book: React.FC<BookProps> = ({ book }) => {
  const currentYear = new Date().getFullYear();
  const yearsAgo = currentYear - book.yearOfPublication;

  return (
    <div className="card">
      <img src={book.imgUrl} alt={book.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{book.title}</h3>
        <p className="card-year">Published {yearsAgo} years ago</p>
      </div>
    </div>
  );
};

export default Book;