import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setAuthentication, setPlayer } from '../store/gameSlice';
import apiService from '../services/api';
import styles from './Login.module.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/game', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || username.trim().length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.checkUser(username.trim());

      if (response.success) {
        dispatch(setAuthentication({
          token: response.token,
          username: response.user.username,
          id: response.user.id
        }));

        dispatch(setPlayer({
          currentRoom: response.user.currentRoom,
          score: response.user.score,
          inventory: response.user.inventory,
          completedPuzzles: response.user.completedPuzzles
        }));

        navigate('/game', { replace: true });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Station Zero</h1>
        <p className={styles.subtitle}>Adventure awaits in the depths of space</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Enter your callsign</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Agent username"
              disabled={isLoading}
              autoFocus
              maxLength={20}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Enter Station'}
          </button>
        </form>

        <p className={styles.hint}>
          New agents will be registered automatically
        </p>
      </div>
    </div>
  );
};

export default Login;
