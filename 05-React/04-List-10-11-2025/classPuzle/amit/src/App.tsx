import Book, { type BookProps } from "./view/components/book/Book";
import styles from "./App.module.scss"
import { useState } from "react";

function App() {
  const firstBooks: BookProps[] = [
    {
      id: "1",
      title: "The Lion Who Loved Strawberries",
      imageUrl: "https://picsum.photos/300/450?random=11",
      yearOfPublication: 2024,
    },
    {
      id: "2",
      title: "Moonlight Over Tel Aviv",
      imageUrl: "https://picsum.photos/300/450?random=22",
      yearOfPublication: 2012,
    },
    {
      id: "3",
      title: "Algorithms for Humans",
      imageUrl: "https://picsum.photos/300/450?random=33",
      yearOfPublication: 2009,
    },
  ]

  const [books, setBooks] = useState<BookProps[]>(firstBooks);
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [yearOfPublication, setYearOfPublication] = useState("")


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = Number(yearOfPublication);
    const currentYear = new Date().getFullYear();


    if (!title.trim()) return alert("Please enter a title.");
    if (!imageUrl.trim()) return alert("Please enter an image URL.");
    if (!Number) return alert("Year must be a whole number.");
    if (!Number.isInteger(parsed)) return alert("Year must be a whole number.");
    if (parsed < 0 || parsed > currentYear)
      return alert(`Year must be between 0 and ${currentYear}.`);


    const newBook: BookProps = {
      id: crypto.randomUUID(),
      title: title.trim(),
      imageUrl: imageUrl.trim(),
      yearOfPublication: parsed,
    };


    setBooks((prev) => [newBook, ...prev]);

    setTitle("");
    setImageUrl("");
    setYearOfPublication("");


  }

  return (
    <>


      <form name="bookForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Title </label>
        <input
          id="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="imageUrl">ImageUrl</label>
        <input
          id="imageUrl"
          placeholder="ImageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label htmlFor="year">Year of Publication</label>
        <input
          id="year"
          placeholder="Year of publication"
          inputMode="numeric"
          value={yearOfPublication}
          onChange={(e) => setYearOfPublication(e.target.value)}
        />


        <button type="submit">
          Add Book
        </button>
      </form>


      <h1 className={styles.title}>Books</h1>

      <div>
        {books.map((book) => (
          <Book
            key={book.id}
            id={book.id}
            imageUrl={book.imageUrl}
            title={book.title}
            yearOfPublication={book.yearOfPublication}
          />
        ))}
      </div>
    </>
  )
}

export default App
