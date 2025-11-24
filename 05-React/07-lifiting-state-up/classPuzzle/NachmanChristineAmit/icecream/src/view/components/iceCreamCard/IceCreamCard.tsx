import styles from "./IceCreamCard.module.scss";

interface IceCreamProps {
  image: string;
  title: string;
  price: number;

}
export const IceCreamCard = ({ image, title, price }: IceCreamProps) => {
  return (
    <div className={styles.container}>
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>{price} ₪</p>
    </div>
  )
}

export default IceCreamCard
