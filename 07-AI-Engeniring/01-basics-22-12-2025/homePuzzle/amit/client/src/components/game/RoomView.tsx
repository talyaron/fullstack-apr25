import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrentRoomData } from '../../store/gameSlice';
import apiService from '../../services/api';
import styles from './RoomView.module.scss';

const RoomView = () => {
  const { currentRoomData } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const { displayText } = useTypewriter({
    text: currentRoomData?.description || 'Initializing systems...',
    speed: 30
  });

  if (!currentRoomData) {
    console.log('[ROOM VIEW] ❌ No room data');
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

        {currentRoomData.puzzles && currentRoomData.puzzles.length > 0 ? (
          <div className={styles.interactiveArea}>
            <h3>Interactive Objects</h3>
            <div className={styles.objects}>
              {currentRoomData.puzzles.map((puzzle: any, index: number) => (
                <button
                  key={puzzle._id || index}
                  className={styles.puzzleButton}
                  onClick={() => {
                    console.log('[ROOM VIEW] 🔐 Puzzle clicked:', puzzle);
                    // TODO: Open puzzle modal
                  }}
                >
                  <span className={styles.puzzleIcon}>🔐</span>
                  <span className={styles.puzzleName}>
                    {puzzle.title || `Puzzle ${index + 1}`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.interactiveArea}>
            <h3>Interactive Objects</h3>
            <div className={styles.objects}>
              <p className={styles.placeholder}>
                No interactive objects in this room.
              </p>
            </div>
          </div>
        )}

        {currentRoomData.connections && Object.keys(currentRoomData.connections).length > 0 && (
          <div className={styles.exits}>
            <h4>Available Exits:</h4>
            <div className={styles.exitButtons}>
              {Object.entries(currentRoomData.connections).map(([direction, roomId]) => (
                <button
                  key={direction}
                  className={styles.exitButton}
                  onClick={async () => {
                    console.log(`[ROOM VIEW] 🚪 Moving ${direction} to room ${roomId}`);
                    try {
                      const response = await apiService.movePlayer(roomId as string);
                      console.log('[ROOM VIEW] Move player response:', response);

                      if (response.success && response.user.currentRoom) {
                        console.log('[ROOM VIEW] ✅ Successfully moved to new room');
                        dispatch(setCurrentRoomData(response.user.currentRoom));
                      }
                    } catch (error) {
                      console.error('[ROOM VIEW] ❌ Error moving player:', error);
                    }
                  }}
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
