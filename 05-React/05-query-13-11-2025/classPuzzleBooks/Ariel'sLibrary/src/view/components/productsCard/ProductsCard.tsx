import styles from "./ProductsCard.module.scss";

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  onSale: boolean;
}

const ProductCard = ({ name, price, imageUrl, onSale }: ProductCardProps) => {
  const discountedPrice = onSale ? (price * 0.8).toFixed(2) : price.toFixed(2);

  return (
    <div className={styles["product-card"]}>
      {onSale && (
        <span className={styles["product-card__sale-badge"]}>SALE!</span>
      )}

      <img
        src={imageUrl}
        alt={name}
        className={styles["product-card__image"]}
      />

      <h3 className={styles["product-card__name"]}>{name}</h3>

      <div className={styles["product-card__price"]}>
        <span className={styles["product-card__current-price"]}>
          ${discountedPrice}
        </span>
        {onSale && (
          <span className={styles["product-card__original-price"]}>
            ${price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
