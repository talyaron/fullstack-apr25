import Header from './Header';
import RoomView from './RoomView';
import InventoryBar from './InventoryBar';
import styles from './GameContainer.module.scss';

const GameContainer = () => {
  return (
    <div className={styles.gameContainer}>
      <Header />

      <div className={styles.mainContent}>
        <RoomView />
      </div>

      <InventoryBar />
    </div>
  );
};

export default GameContainer;
