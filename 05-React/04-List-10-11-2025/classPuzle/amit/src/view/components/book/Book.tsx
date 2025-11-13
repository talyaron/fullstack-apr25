import styles from "./Book.module.scss";

export type BookProps = {
  id: number;
  imageUrl: string;
  title: string;
  yearOfPublication: number;
};

const Book = ({ id, imageUrl, title, yearOfPublication }: BookProps) => {
  const currentYear = new Date().getFullYear();
  const yearsAgo = Math.max(0, currentYear - yearOfPublication);

  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <img src={imageUrl} alt={title} />
        <span className={styles.badge}>#{id}</span>
      </div>

      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p>Published {yearsAgo} years ago</p>
      </header>
    </article>
  );
};

export default Book;
