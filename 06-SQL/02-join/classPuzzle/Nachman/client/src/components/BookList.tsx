import type { BookWithAuthor } from '../types';

interface BookListProps {
  books: BookWithAuthor[];
  onEdit: (book: BookWithAuthor) => void;
  onDelete: (id: number) => void;
}

export function BookList({ books, onEdit, onDelete }: BookListProps) {
  if (books.length === 0) {
    return <p className="no-items">No books found. Add one!</p>;
  }

  const getAuthorName = (book: BookWithAuthor) => {
    if (book.author_first_name && book.author_last_name) {
      return `${book.author_first_name} ${book.author_last_name}`;
    }
    return '-';
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>ISBN</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.book_id}>
            <td>{book.book_id}</td>
            <td>{book.title}</td>
            <td>{getAuthorName(book)}</td>
            <td>{book.publication_year || '-'}</td>
            <td>{book.isbn || '-'}</td>
            <td>
              <button onClick={() => onEdit(book)}>Edit</button>
              <button onClick={() => onDelete(book.book_id)} className="delete-btn">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
