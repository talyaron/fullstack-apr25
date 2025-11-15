import styles from "./Card.module.scss";

interface CardProps {
  title: string;
  imgUrl: string;
  yearOfPublication: number;
}

function Card({ title, imgUrl, yearOfPublication }: CardProps) {
  const yearsAgo = new Date().getFullYear() - yearOfPublication;

  return (
    <div className={styles.card}>
      <img src={imgUrl} alt={title} />
      <h3>{title}</h3>
      <p>Published {yearsAgo} years ago</p>
    </div>
  );
}

export default Card;