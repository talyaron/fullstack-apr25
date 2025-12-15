import { useState, useEffect } from 'react';
import type { Author, AuthorInput } from '../types';

interface AuthorFormProps {
  author?: Author | null;
  onSubmit: (author: AuthorInput) => void;
  onCancel: () => void;
}

export function AuthorForm({ author, onSubmit, onCancel }: AuthorFormProps) {
  const [formData, setFormData] = useState<AuthorInput>({
    first_name: '',
    last_name: '',
    date_of_birth: null,
    date_of_death: null,
  });

  useEffect(() => {
    if (author) {
      setFormData({
        first_name: author.first_name,
        last_name: author.last_name,
        date_of_birth: author.date_of_birth,
        date_of_death: author.date_of_death,
      });
    }
  }, [author]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formatDateForInput = (dateStr: string | null) => {
    if (!dateStr) return '';
    return dateStr.split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="data-form">
      <h2>{author ? 'Edit Author' : 'Add Author'}</h2>
      <div className="form-group">
        <label htmlFor="first_name">First Name</label>
        <input
          id="first_name"
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date_of_birth">Date of Birth</label>
        <input
          id="date_of_birth"
          type="date"
          value={formatDateForInput(formData.date_of_birth)}
          onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value || null })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date_of_death">Date of Death</label>
        <input
          id="date_of_death"
          type="date"
          value={formatDateForInput(formData.date_of_death)}
          onChange={(e) => setFormData({ ...formData, date_of_death: e.target.value || null })}
        />
      </div>
      <div className="form-actions">
        <button type="submit">{author ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
