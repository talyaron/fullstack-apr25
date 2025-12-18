import type { Author } from '../types';

interface AuthorListProps {
  authors: Author[];
  onEdit: (author: Author) => void;
  onDelete: (id: number) => void;
}

export function AuthorList({ authors, onEdit, onDelete }: AuthorListProps) {
  if (authors.length === 0) {
    return <p className="no-items">No authors found. Add one!</p>;
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Birth Date</th>
          <th>Death Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.author_id}>
            <td>{author.author_id}</td>
            <td>{author.first_name}</td>
            <td>{author.last_name}</td>
            <td>{formatDate(author.date_of_birth)}</td>
            <td>{formatDate(author.date_of_death)}</td>
            <td>
              <button onClick={() => onEdit(author)}>Edit</button>
              <button onClick={() => onDelete(author.author_id)} className="delete-btn">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
