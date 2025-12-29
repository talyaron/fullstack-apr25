import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setCurrentRoomData, addCompletedPuzzle, updateScore, addToInventory } from '../../store/gameSlice';
import apiService from '../../services/api';
import PuzzleModal from '../puzzle/PuzzleModal';
import styles from './RoomView.module.scss';

const RoomView = () => {
  const { currentRoomData } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  // Puzzle modal state
  const [selectedPuzzle, setSelectedPuzzle] = useState<any>(null);
  const [isPuzzleModalOpen, setIsPuzzleModalOpen] = useState(false);

  // Get the room description text with typewriter effect
  const roomDescription = currentRoomData?.description || 'Initializing systems...';
  const { displayText } = useTypewriter({
    text: roomDescription,
    speed: 30
  });

  // Show loading state if room data is not available
  if (!currentRoomData) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading room data...</p>
      </div>
    );
  }

  // Check if the current room has puzzles
  const hasPuzzles = currentRoomData.puzzles && currentRoomData.puzzles.length > 0;

  // Check if the current room has exits/connections to other rooms
  const hasConnections = currentRoomData.connections && Object.keys(currentRoomData.connections).length > 0;

  // Handle player movement to another room
  const handleMoveToRoom = async (targetRoomId: string, direction: string) => {
    try {
      const response = await apiService.movePlayer(targetRoomId);

      if (response.success && response.user.currentRoom) {
        // Update the Redux store with the new room data
        dispatch(setCurrentRoomData(response.user.currentRoom));
      } else {
        console.error('Failed to move player: Invalid response from server');
      }
    } catch (error) {
      console.error(`Error moving player ${direction}:`, error);
      // TODO: Show error message to user
    }
  };

  // Handle opening a puzzle
  const handlePuzzleClick = async (puzzleId: string) => {
    try {
      const response = await apiService.getPuzzleById(puzzleId);
      if (response.success && response.puzzle) {
        setSelectedPuzzle({
          id: response.puzzle._id,
          title: response.puzzle.title,
          description: response.puzzle.problemDescription,
          starterCode: response.puzzle.starterCode,
          functionName: response.puzzle.functionName,
          difficulty: response.puzzle.difficulty,
          points: response.puzzle.points,
          maxAttempts: response.puzzle.maxAttempts,
          hints: response.puzzle.hints,
          rewardItem: response.puzzle.rewardItem
        });
        setIsPuzzleModalOpen(true);
      }
    } catch (error) {
      console.error('Error loading puzzle:', error);
    }
  };

  // Handle puzzle solution submission
  const handlePuzzleSubmit = async (code: string) => {
    if (!selectedPuzzle) return { success: false, message: 'No puzzle selected' };

    try {
      const response = await apiService.verifyPuzzleSolution(selectedPuzzle.id, code);

      if (response.success && response.result.allTestsPassed) {
        // Update Redux store with rewards
        dispatch(addCompletedPuzzle(selectedPuzzle.id));
        dispatch(updateScore(response.result.reward.points));
        dispatch(addToInventory(response.result.reward.item));
      }

      return response.result;
    } catch (error: any) {
      console.error('Error verifying puzzle solution:', error);
      return {
        success: false,
        allTestsPassed: false,
        message: error.response?.data?.message || 'Failed to verify solution'
      };
    }
  };

  // Handle closing puzzle modal
  const handleClosePuzzleModal = () => {
    setIsPuzzleModalOpen(false);
    setSelectedPuzzle(null);
  };

  return (
    <motion.div
      className={styles.roomView}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
      key={currentRoomData._id}
    >
      {/* Room Header with Title */}
      <div className={styles.roomHeader}>
        <h1 className={styles.roomTitle}>{currentRoomData.title}</h1>
      </div>

      {/* Room Content */}
      <div className={styles.roomContent}>
        {/* Room Description with Typewriter Effect */}
        <div className={styles.descriptionBox}>
          <p className={styles.description} style={{ whiteSpace: 'pre-wrap' }}>
            {displayText}
            <span className={styles.cursor}>_</span>
          </p>
        </div>

        {/* Interactive Objects / Puzzles Section */}
        <div className={styles.interactiveArea}>
          <h3>Interactive Objects</h3>
          <div className={styles.objects}>
            {hasPuzzles ? (
              currentRoomData.puzzles.map((puzzle: any, index: number) => (
                <button
                  key={puzzle._id || index}
                  className={styles.puzzleButton}
                  onClick={() => handlePuzzleClick(puzzle._id || puzzle)}
                >
                  <span className={styles.puzzleIcon}>🔐</span>
                  <span className={styles.puzzleName}>
                    {puzzle.title || `Puzzle ${index + 1}`}
                  </span>
                </button>
              ))
            ) : (
              <p className={styles.placeholder}>
                No interactive objects in this room.
              </p>
            )}
          </div>
        </div>

        {/* Available Exits / Navigation Buttons */}
        {hasConnections && (
          <div className={styles.exits}>
            <h4>Available Exits:</h4>
            <div className={styles.exitButtons}>
              {Object.entries(currentRoomData.connections).map(([direction, roomId]) => (
                <button
                  key={direction}
                  className={styles.exitButton}
                  onClick={() => handleMoveToRoom(roomId as string, direction)}
                >
                  {direction.toUpperCase()} →
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Puzzle Modal */}
      {selectedPuzzle && (
        <PuzzleModal
          isOpen={isPuzzleModalOpen}
          onClose={handleClosePuzzleModal}
          puzzle={selectedPuzzle}
          onSubmit={handlePuzzleSubmit}
        />
      )}
    </motion.div>
  );
};

export default RoomView;
