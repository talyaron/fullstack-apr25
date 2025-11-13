import styles from "./Card.module.scss";

export function Card() {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>My Card</h3>
      <p className={styles.cardDescription}>lorem ipsum dolor sit amet</p>
    </div>
  )
}

export default Card
