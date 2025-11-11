import { useState } from 'react'
import style from './App.module.scss'
import type { booksModel } from './models/booksModel.tsx'
import { booksData } from './models/booksModel.tsx'
import Book from './view/components/book/Book.tsx'
function App() {
  const [books, setBooks] = useState<booksModel[]>(booksData)
  //what is the type of event ⬇
  function handleSubmit(event:any) {
    event.preventDefault()
    const form = event.target

    const newBook: booksModel = {
      id: Number(crypto.randomUUID()),
      title: form.title.value,
      imgUrl: form.imgUrl.value,
      yearOfPublication: Number(form.yearOfPublication.value)
    }
    setBooks([...books, newBook])
    form.reset()
  }
  return (
    <div className={style.app}>
      <h1>BOOKS</h1>
      <div className={style.booksList}>
        {books.map((book) => <Book book={book} key={book.id} />)}
      </div>
      <form onSubmit={handleSubmit} className={style.addBookForm} action="submit">
        <h1>Add a new book</h1>
        <div className={style.formInput}>
          <input type="text" placeholder="Book Title" name='title' required/>
          <input type="text" placeholder="Image URL" name='imgUrl' required/>
          <input type="number" defaultValue={2000} placeholder="Year of Publication" name='yearOfPublication' required/></div>
        <button className={style.addButton} type="submit">Add Book</button>
      </form>
      <h2>READ A BOOK, OR DONT . I DONT REALLY CARE. BEY FOR NOW 😊</h2>
    </div>
  )
}

export default App
