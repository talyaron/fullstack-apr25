import  styles from './Book.module.scss'

interface BookProps {
  title: string
  author: string
  description: string
  year: number
}

const Book = (Book: BookProps) => {
  
    const currentYear = new Date().getFullYear();
    const yearsAgo = currentYear - Book.year;
  
  return (
    <div className={styles.bookCard}>
      <h2>{Book.title}</h2>
      <h3>by {Book.author}</h3>
      <p>{Book.description}</p>
      <p>Published {yearsAgo} years ago.</p>
    </div>
  )
}

export default Book