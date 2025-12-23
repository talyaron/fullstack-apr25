import Header from './Header';
import RoomView from './RoomView';
import InventoryBar from './InventoryBar';
import MapOverlay from './MapOverlay';
import styles from './GameContainer.module.scss';

const GameContainer = () => {
  return (
    <div className={styles.gameContainer}>
      <Header />

      <div className={styles.mainContent}>
        <RoomView />
        <MapOverlay />
      </div>

      <InventoryBar />
    </div>
  );
};

export default GameContainer;
