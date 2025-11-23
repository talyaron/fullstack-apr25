import styles from "./ContactList.module.scss";

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className={styles.productItem}>
      <h3 className={styles.productItem__name}>{product.name}</h3>
      <p className={styles.productItem__price}>${product.price}</p>
      <span 
        className={`${styles.productItem__stock} ${product.inStock ? styles['productItem__stock--available'] : ''}`}
      >
        {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
      </span>
    </div>
  );
};

const ProductList: React.FC = () => {
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 1200, inStock: true },
    { id: 2, name: 'Phone', price: 800, inStock: false },
    { id: 3, name: 'Tablet', price: 500, inStock: true }
  ];

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;