import React from 'react';

function CatList({ cats, onDelete, onEdit }) {
  if (cats.length === 0) {
    return (
      <div className="empty">
        <p>No cats in your collection yet.</p>
        <p>Add your first cat using the form above!</p>
      </div>
    );
  }

  return (
    <div className="cat-list">
      {cats.map(cat => (
        <div key={cat._id} className="cat-card">
          <img
            src={cat.imageUrl}
            alt={cat.name}
            className="cat-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Cat+Image';
            }}
          />
          <div className="cat-info">
            <h3>{cat.name}</h3>
            <p className="cat-breed">{cat.breed || 'Unknown breed'}</p>
            {cat.description && (
              <p className="cat-description">{cat.description}</p>
            )}
            <div className="cat-actions">
              <button
                className="btn btn-secondary"
                onClick={() => onEdit(cat)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (window.confirm(`Delete ${cat.name}?`)) {
                    onDelete(cat._id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CatList;
