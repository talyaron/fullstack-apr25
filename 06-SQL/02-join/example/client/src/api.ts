import type { Author, AuthorInput, Book, BookInput, BookWithAuthor } from './types';

const API_URL = 'http://localhost:3001/api';

// Author API functions
export async function getAuthors(): Promise<Author[]> {
  const response = await fetch(`${API_URL}/authors`);
  if (!response.ok) throw new Error('Failed to fetch authors');
  return response.json();
}

export async function getAuthor(id: number): Promise<Author> {
  console.log("get books")
  const response = await fetch(`${API_URL}/authors/${id}`);
  if (!response.ok) throw new Error('Failed to fetch author');
  return response.json();
}

export async function createAuthor(author: AuthorInput): Promise<Author> {
  const response = await fetch(`${API_URL}/authors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(author),
  });
  if (!response.ok) throw new Error('Failed to create author');
  return response.json();
}

export async function updateAuthor(id: number, author: AuthorInput): Promise<Author> {
  const response = await fetch(`${API_URL}/authors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(author),
  });
  if (!response.ok) throw new Error('Failed to update author');
  return response.json();
}

export async function deleteAuthor(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/authors/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete author');
  }
}

// Book API functions
export async function getBooks(): Promise<BookWithAuthor[]> {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  const books = await response.json();
  console.log(books)
  return books;
  
}

export async function getBook(id: number): Promise<BookWithAuthor> {
  const response = await fetch(`${API_URL}/books/${id}`);
  if (!response.ok) throw new Error('Failed to fetch book');
  return response.json();
}

export async function createBook(book: BookInput): Promise<Book> {
  const response = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create book');
  }
  return response.json();
}

export async function updateBook(id: number, book: BookInput): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update book');
  }
  return response.json();
}

export async function deleteBook(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete book');
}
