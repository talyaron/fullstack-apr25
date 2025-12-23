import { useState } from 'react';
import { FaMap } from 'react-icons/fa';
import Modal from '../ui/Modal';
import { useAppSelector } from '../../store/hooks';
import styles from './MapOverlay.module.scss';

const MapOverlay = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { discoveredRooms } = useAppSelector((state) => state.game);

  return (
    <>
      <button
        className={styles.mapButton}
        onClick={() => setIsMapOpen(true)}
        aria-label="Open map"
      >
        <FaMap className={styles.icon} />
        <span>MAP</span>
      </button>

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

export default MapOverlay;
