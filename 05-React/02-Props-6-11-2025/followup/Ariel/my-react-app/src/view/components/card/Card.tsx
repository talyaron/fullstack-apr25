import styles from "./Card.module.scss";

interface Props {
  text?: string;
  imgUrl?: string;
  alt?: string;
}

const Card = ({text, imgUrl, alt}: Props) => {
  if (!alt && imgUrl) {
    alt = text ? `Image of ${text}` : "Card image";
  }
  return (
    <div className={styles.card}>
      {imgUrl && <img src={imgUrl} alt={alt} />}
      <h1>{text}</h1>
    </div>
  );
};

export default Card;
