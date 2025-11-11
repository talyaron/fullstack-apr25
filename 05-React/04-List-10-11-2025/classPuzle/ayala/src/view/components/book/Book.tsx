import style from './Book.module.scss'
import type { booksModel } from '../../../models/booksModel'
const Book = ({book}: {book: booksModel}) => {
    const bookAge = (new Date().getFullYear())-(book.yearOfPublication)
  return (
    <div className={style.book} style={{backgroundImage: `url(${book.imgUrl})`}}>
        <div className={style.bookTitle}>{book.title}</div>
        <div className={style.bookAge}>Published {bookAge} years ago</div>
    </div>
  )
}

export default Book
