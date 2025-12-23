import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/gameSlice';
import styles from './Game.module.scss';

const Game = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { username, score, currentRoom, inventory, completedPuzzles } = useAppSelector(
    (state) => state.game
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className={styles.gameContainer}>
      <header className={styles.header}>
        <div className={styles.logo}>Station Zero</div>
        <div className={styles.userInfo}>
          <span className={styles.username}>Agent: {username}</span>
          <span className={styles.score}>Score: {score}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.welcomeCard}>
          <h1>Welcome to Station Zero, {username}!</h1>
          <p className={styles.description}>
            You've successfully entered the station. Your mission is about to begin...
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Current Location</div>
              <div className={styles.statValue}>
                {currentRoom?.title || 'Initialization Chamber'}
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Inventory Items</div>
              <div className={styles.statValue}>{inventory.length}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Puzzles Solved</div>
              <div className={styles.statValue}>{completedPuzzles.length}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Total Score</div>
              <div className={styles.statValue}>{score}</div>
            </div>
          </div>

          <div className={styles.comingSoon}>
            <p>Game mechanics coming in the next steps:</p>
            <ul>
              <li>Room exploration and navigation</li>
              <li>Interactive puzzle solving with code editor</li>
              <li>Inventory management system</li>
              <li>Progressive difficulty and rewards</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;
