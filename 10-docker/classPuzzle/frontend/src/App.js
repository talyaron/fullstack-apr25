import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CatForm from './components/CatForm';
import CatList from './components/CatList';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCat, setEditingCat] = useState(null);

  const fetchCats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cats`);
      setCats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const addCat = async (catData) => {
    try {
      const response = await axios.post(`${API_URL}/cats`, catData);
      setCats([response.data, ...cats]);
    } catch (err) {
      setError('Failed to add cat');
      console.error(err);
    }
  };

  const updateCat = async (id, catData) => {
    try {
      const response = await axios.put(`${API_URL}/cats/${id}`, catData);
      setCats(cats.map(cat => cat._id === id ? response.data : cat));
      setEditingCat(null);
    } catch (err) {
      setError('Failed to update cat');
      console.error(err);
    }
  };

  const deleteCat = async (id) => {
    try {
      await axios.delete(`${API_URL}/cats/${id}`);
      setCats(cats.filter(cat => cat._id !== id));
    } catch (err) {
      setError('Failed to delete cat');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Cat Collection</h1>
        <p>Collect and share your favorite cat images</p>
      </header>

      <main className="main">
        <CatForm
          onSubmit={editingCat ? (data) => updateCat(editingCat._id, data) : addCat}
          initialData={editingCat}
          onCancel={() => setEditingCat(null)}
        />

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">Loading cats...</div>
        ) : (
          <CatList
            cats={cats}
            onDelete={deleteCat}
            onEdit={setEditingCat}
          />
        )}
      </main>
    </div>
  );
}

export default App;
