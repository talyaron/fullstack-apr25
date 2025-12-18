import { useState, useEffect } from 'react';
import type { Product, ProductInput } from '../types';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: ProductInput) => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div className="form-actions">
        <button type="submit">{product ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
