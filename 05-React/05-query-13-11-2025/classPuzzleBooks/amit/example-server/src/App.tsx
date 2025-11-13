import { useEffect, useState } from 'react';
import './App.css'

type Book = {
  _id: string;
  title: string;
  author: string;
  description?: string;
  year?: number;
  createdAt?: string;
  updatedAt?: string;
};

function App() {

  const [serverMessage, setServerMessage] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([])

  //functions

  const onLogin = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    };

    try {
      if (!loginData.email || !loginData.password) {
        throw new Error('Email and password are required');
      }

      const response = await fetch('http://localhost:5010/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful', result);
        setServerMessage(`Welcome back, ${result.user.name}!`);
        await loadBooks();
      } else {
        console.error('Login failed');
        setServerMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setServerMessage(`An error occurred during login. ${(error as Error).message}`);
    }
  }

  const onSubmit = async (e: any) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string
    };


    try {
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('All fields are required');

      }

      const response = await fetch('http://localhost:5010/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        console.log('User registered successfully');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setServerMessage(`An error occurred during registration. ${(error as Error).message}`);
    }

  }

  const loadBooks = async () => {
    try {
      const res = await fetch("http://localhost:5010/api/books", {
        credentials: "include",
      });
      if (!res.ok) {
        setServerMessage(`GET /api/books failed (${res.status})`);
        return;
      }
      const data = await res.json();
      setBooks(data.books || []);
    } catch (error) {
      setServerMessage(`Failed to load books. ${(error as Error).message}`);
    }
  };

  const createBookSubmit = async (e: any) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const bookData = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      description: formData.get("description") as string,
      yearOfPublication: formData.get('yearOfPublication') as string
    };


    try {
      if (!bookData.title || !bookData.author || !bookData.description || !bookData.yearOfPublication) {
        throw new Error("All fields are required");
      }

      const year = Number(bookData.yearOfPublication);
      if (!Number.isInteger(year)) throw new Error("Year must be a whole number");

      const response = await fetch("http://localhost:5010/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          title: bookData.title,
          author: bookData.author,
          description: bookData.description,
          year: bookData.yearOfPublication,
        }),
      });

      if (!response.ok) {
        setServerMessage(`POST /api/books failed (${response.status})`);
        return;
      }

      const data = await response.json();
      setBooks((prev) => [data.book, ...prev]);
      setServerMessage("Book created successfully.");
      (e.currentTarget as HTMLFormElement).reset();

    } catch (error) {
      console.error(`Error:, ${error}`)
      setServerMessage(`An error occurred during fetching books. ${(error as Error).message}`);
    }
  }

  useEffect(() => {
  (async () => {
    const me = await fetch('http://localhost:5010/api/auth/me', {
      credentials: 'include'
    });
    if (me.ok) {
      await loadBooks();
    }
  })();
}, []);

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Register</button>
        </form>
        {serverMessage && <div>{serverMessage}</div>}
      </div>

      <form onSubmit={onLogin}>
        <h2>Login</h2>
        <div>
          <label htmlFor="login-email">Email:</label>
          <input type="email" id="login-email" name="email" required />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input type="password" id="login-password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>

      <form onSubmit={createBookSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="title" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="author" id="author" name="author" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="description" id="description" name="description" required />
        </div>
        <div>
          <label htmlFor="yearOfPublication">Year of publication</label>
          <input type="number" id='yearOfPublication' name='yearOfPublication'/>
        </div>
        <button type="submit">Create Book</button>
      </form>

       <h2>Books</h2>
      <button onClick={loadBooks}>Load Books</button>
      <ul>
        {books.map((b) => (
          <li key={b._id}>
            <strong>{b.title}</strong> — {b.author}{" "}
            {typeof b.year === "number" ? `(${b.year})` : ""}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
