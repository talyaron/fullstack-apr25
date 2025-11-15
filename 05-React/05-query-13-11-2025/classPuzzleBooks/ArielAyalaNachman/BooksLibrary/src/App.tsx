import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Book from "./view/components/book/Book";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  year: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5010/api/books");

      if (!response) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (!data.success) throw new Error("Failed to fetch books");

      const booksData: Book[] = data.books;
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const form = event.currentTarget

  const newBook = {
    title: form.value.title,
    author: form.value.author,
    description: form.value.description,
    year: Number(form.value.yearOfPublication)
  }

  try {
    const response = await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBook)
    })

    if (!response.ok) {
      throw new Error("Failed to add book")
    }

    const addBookData = await response.json()
    if (!addBookData.success)  throw new Error("Failed to add book")
    console.log("Book added:", addBookData)

    // Optionally update local state if needed
    // setBooks([...books, savedBook])

    form.reset()
  } catch (error) {
    console.error(error)
  }
}

  return (
    <>
      <div>
        <h1>Books Library</h1>
        <div className={styles.booksContainer}>
          {books.map((book) => (
            <Book
              key={book._id}
              title={book.title}
              author={book.author}
              description={book.description}
              year={book.year}
            />
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className={styles.addBookForm}
          action="submit"
        >
          <h1>Add a new book</h1>
          <div className={styles.formInput}>
            <input type="text" placeholder="Book Title" name="title" required />

            <input type="text" placeholder="Author" name="author" required />

            <input type="text" placeholder="Description" name="description" required />

            <input
              type="number"
              defaultValue={2000}
              placeholder="Year of Publication"
              name="yearOfPublication"
              required
            />
          </div>
          <button className={styles.addButton} type="submit">
            Add Book
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
