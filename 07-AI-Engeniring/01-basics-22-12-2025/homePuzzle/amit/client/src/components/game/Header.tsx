import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout, updateAudioSettings, updateDisplaySettings, updateGameplaySettings } from '../../store/gameSlice';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import Modal from '../ui/Modal';
import apiService from '../../services/api';
import styles from './Header.module.scss';

const Header = () => {
  const { username, score, settings } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      navigate('/login');
    }
  };

  const handleSettingChange = async (category: 'audio' | 'display' | 'gameplay', key: string, value: any) => {
    try {
      const updatedCategory = { ...settings[category], [key]: value };

      if (category === 'audio') {
        dispatch(updateAudioSettings(updatedCategory));
      } else if (category === 'display') {
        dispatch(updateDisplaySettings(updatedCategory));
      } else if (category === 'gameplay') {
        dispatch(updateGameplaySettings(updatedCategory));
      }

      setIsSaving(true);
      await apiService.updateSettings({
        ...settings,
        [category]: updatedCategory
      });
      setIsSaving(false);
    } catch (error) {
      console.error('Error updating settings:', error);
      setIsSaving(false);
    }
  };

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
              <input
                type="checkbox"
                checked={settings.audio.soundEffects}
                onChange={(e) => handleSettingChange('audio', 'soundEffects', e.target.checked)}
              />
            </div>
            <div className={styles.settingItem}>
              <label>Background Music</label>
              <input
                type="checkbox"
                checked={settings.audio.backgroundMusic}
                onChange={(e) => handleSettingChange('audio', 'backgroundMusic', e.target.checked)}
              />
            </div>
            <div className={styles.settingItem}>
              <label>Volume: {settings.audio.volume}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.audio.volume}
                onChange={(e) => handleSettingChange('audio', 'volume', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className={styles.settingSection}>
            <h3>Display</h3>
            <div className={styles.settingItem}>
              <label>Scanline Effect</label>
              <input
                type="checkbox"
                checked={settings.display.scanlineEffect}
                onChange={(e) => handleSettingChange('display', 'scanlineEffect', e.target.checked)}
              />
            </div>
            <div className={styles.settingItem}>
              <label>Terminal Font Size</label>
              <select
                value={settings.display.terminalFontSize}
                onChange={(e) => handleSettingChange('display', 'terminalFontSize', e.target.value)}
              >
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
              <input
                type="checkbox"
                checked={settings.gameplay.showHints}
                onChange={(e) => handleSettingChange('gameplay', 'showHints', e.target.checked)}
              />
            </div>
            <div className={styles.settingItem}>
              <label>Auto-save</label>
              <input
                type="checkbox"
                checked={settings.gameplay.autoSave}
                onChange={(e) => handleSettingChange('gameplay', 'autoSave', e.target.checked)}
              />
            </div>
          </div>

          {isSaving && (
            <p className={styles.savingIndicator}>Saving settings...</p>
          )}

          {/* Logout Button */}
          <div className={styles.logoutSection}>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
              aria-label="Logout"
            >
              <FaSignOutAlt className={styles.logoutIcon} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
