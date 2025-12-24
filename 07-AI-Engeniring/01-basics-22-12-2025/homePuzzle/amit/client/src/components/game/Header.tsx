import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { FaCog } from 'react-icons/fa';
import Modal from '../ui/Modal';
import styles from './Header.module.scss';

const Header = () => {
  const { username, score } = useAppSelector((state) => state.game);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <span className={styles.logoText}>STATION ZERO</span>
            <span className={styles.logoSubtext}>// TERMINAL v2.1.5</span>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.playerInfo}>
            <div className={styles.infoItem}>
              <span className={styles.label}>AGENT:</span>
              <span className={styles.value}>{username}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>SCORE:</span>
              <span className={styles.value}>{score}</span>
            </div>
          </div>

          <button
            className={styles.settingsButton}
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open settings"
          >
            <FaCog className={styles.icon} />
          </button>
        </div>
      </header>

      {/* Settings Modal */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Settings"
        width="700px"
      >
        <div className={styles.settingsContent}>
          <div className={styles.settingSection}>
            <h3>Audio</h3>
            <div className={styles.settingItem}>
              <label>Sound Effects</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className={styles.settingItem}>
              <label>Background Music</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className={styles.settingItem}>
              <label>Volume</label>
              <input type="range" min="0" max="100" defaultValue="70" />
            </div>
          </div>

          <div className={styles.settingSection}>
            <h3>Display</h3>
            <div className={styles.settingItem}>
              <label>Scanline Effect</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className={styles.settingItem}>
              <label>Terminal Font Size</label>
              <select defaultValue="medium">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>

          <div className={styles.settingSection}>
            <h3>Gameplay</h3>
            <div className={styles.settingItem}>
              <label>Show Hints</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className={styles.settingItem}>
              <label>Auto-save</label>
              <input type="checkbox" defaultChecked />
            </div>
          </div>

          <p className={styles.note}>
            Note: Settings are currently placeholders and will be functional in future updates.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Header;
