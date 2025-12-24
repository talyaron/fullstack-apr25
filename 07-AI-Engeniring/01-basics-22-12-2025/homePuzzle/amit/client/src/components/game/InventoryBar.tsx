import { useState } from 'react';
import { FaMap } from 'react-icons/fa';
import { useAppSelector } from '../../store/hooks';
import Modal from '../ui/Modal';
import styles from './InventoryBar.module.scss';

const InventoryBar = () => {
  const { inventory, discoveredRooms } = useAppSelector((state) => state.game);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const slots = Array(6).fill(null);

  return (
    <>
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

        {/* Map Button on the far right */}
        <button
          className={styles.mapButton}
          onClick={() => setIsMapOpen(true)}
          aria-label="Open map"
        >
          <FaMap className={styles.mapIcon} />
          <span>MAP</span>
        </button>
      </div>

      {/* Map Modal */}
      <Modal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        title="Station Map"
        width="800px"
      >
        <div className={styles.mapContent}>
          <div className={styles.mapGrid}>
            {discoveredRooms && discoveredRooms.length > 0 ? (
              discoveredRooms.map((room) => (
                <div key={room._id} className={styles.mapRoom}>
                  <div className={styles.roomIcon}>📍</div>
                  <div className={styles.roomInfo}>
                    <div className={styles.roomName}>{room.title}</div>
                    <div className={styles.roomStatus}>Discovered</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noRooms}>
                <p>No rooms discovered yet.</p>
                <p className={styles.hint}>Start exploring to map the station!</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InventoryBar;
