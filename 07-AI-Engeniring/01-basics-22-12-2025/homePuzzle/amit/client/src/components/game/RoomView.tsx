import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useAppSelector } from '../../store/hooks';
import styles from './RoomView.module.scss';

const RoomView = () => {
  const { currentRoomData } = useAppSelector((state) => state.game);
  const { displayText } = useTypewriter({
    text: currentRoomData?.description || 'Initializing systems...',
    speed: 30
  });

  if (!currentRoomData) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading room data...</p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.roomView}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
      key={currentRoomData._id}
    >
      <div className={styles.roomHeader}>
        <h1 className={styles.roomTitle}>{currentRoomData.title}</h1>
      </div>

      <div className={styles.roomContent}>
        <div className={styles.descriptionBox}>
          <p className={styles.description}>
            {displayText}
            <span className={styles.cursor}>_</span>
          </p>
        </div>

        <div className={styles.interactiveArea}>
          <h3>Interactive Objects</h3>
          <div className={styles.objects}>
            <p className={styles.placeholder}>
              No interactive objects in this room yet.
            </p>
          </div>
        </div>

        {currentRoomData.connections && Object.keys(currentRoomData.connections).length > 0 && (
          <div className={styles.exits}>
            <h4>Available Exits:</h4>
            <div className={styles.exitButtons}>
              {Object.entries(currentRoomData.connections).map(([direction, roomId]) => (
                <button
                  key={direction}
                  className={styles.exitButton}
                  onClick={() => console.log(`Moving ${direction} to room ${roomId}`)}
                >
                  {direction.toUpperCase()} →
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RoomView;
