import { useAppSelector } from '../../store/hooks';
import styles from './InventoryBar.module.scss';

const InventoryBar = () => {
  const { inventory } = useAppSelector((state) => state.game);
  const slots = Array(6).fill(null);

  return (
    <div className={styles.inventoryBar}>
      <div className={styles.label}>INVENTORY</div>
      <div className={styles.slots}>
        {slots.map((_, index) => {
          const item = inventory[index];
          return (
            <div
              key={index}
              className={`${styles.slot} ${item ? styles.filled : styles.empty}`}
            >
              {item ? (
                <div className={styles.item}>
                  <span className={styles.itemName}>{item.name || 'Item'}</span>
                </div>
              ) : (
                <span className={styles.slotNumber}>{index + 1}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryBar;
