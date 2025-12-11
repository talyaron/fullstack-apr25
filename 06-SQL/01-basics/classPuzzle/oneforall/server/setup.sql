-- Create database
CREATE DATABASE IF NOT EXISTS store;
USE store;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO products (name, description, price, stock) VALUES
  ('Laptop', 'High-performance laptop with 16GB RAM', 999.99, 10),
  ('Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 50),
  ('Keyboard', 'Mechanical gaming keyboard', 79.99, 25),
  ('Monitor', '27-inch 4K display', 349.99, 15),
  ('Headphones', 'Noise-canceling wireless headphones', 199.99, 30);
