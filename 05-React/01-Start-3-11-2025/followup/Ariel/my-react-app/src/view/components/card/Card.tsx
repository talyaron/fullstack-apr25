import styles from "./Card.module.scss";

const Card = () => {
  return (
    <>
      <div className={styles.card}>
        <h3>My Card</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
          consequatur illum vero doloribus nisi quo quod ex ullam? Corrupti
          delectus dolor laboriosam enim vero aspernatur sequi voluptatum esse
          inventore nesciunt!
        </p>
      </div>
    </>
  );
};

export default Card;
