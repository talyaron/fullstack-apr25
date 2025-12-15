import { useState, useEffect } from 'react';
import type { Product, ProductInput } from './types';
import { getProducts, createProduct, updateProduct, deleteProduct } from './api';
import { ProductList } from './components/ProductList';
import { ProductForm } from './components/ProductForm';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch {
      setError('Failed to load products. Make sure the server is running.');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch {
        setError('Failed to load products. Make sure the server is running.');
      }
    };
    
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      setError('Failed to delete product');
    }
  };

  const handleSubmit = async (data: ProductInput) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.product_id, data);
      } else {
        await createProduct(data);
      }
      setShowForm(false);
      setEditingProduct(null);
      loadProducts();
    } catch {
      setError('Failed to save product');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="app">
      <h1>Store Products</h1>
      {error && <div className="error">{error}</div>}
      {showForm ? (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <button onClick={handleAdd} className="add-btn">Add Product</button>
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}

export default App;
