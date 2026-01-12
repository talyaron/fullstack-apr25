import React, { useState, useEffect } from 'react';

function CatForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    breed: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        imageUrl: initialData.imageUrl || '',
        breed: initialData.breed || '',
        description: initialData.description || ''
      });
    } else {
      setFormData({
        name: '',
        imageUrl: '',
        breed: '',
        description: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.imageUrl) {
      alert('Name and Image URL are required');
      return;
    }
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        name: '',
        imageUrl: '',
        breed: '',
        description: ''
      });
    }
  };

  return (
    <form className="cat-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Cat' : 'Add New Cat'}</h2>

      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter cat's name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL *</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/cat.jpg"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="breed">Breed</label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="e.g., Persian, Siamese"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us about this cat..."
          rows="3"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Cat' : 'Add Cat'}
        </button>
        {initialData && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default CatForm;
