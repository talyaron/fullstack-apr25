import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch } from './store/hooks';
import { setPlayer } from './store/gameSlice';
import apiService from './services/api';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Game from './pages/Game';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('stationZeroToken');
      console.log('[APP] Checking auth on mount. Token:', token ? 'exists' : 'missing');

      if (token) {
        try {
          const response = await apiService.getCurrentUser();

          if (response.success) {
            const roomData = response.user.currentRoom;
            console.log('[APP] Session restored. Room:', roomData?.title || 'No room');

            dispatch(setPlayer({
              id: response.user.id,
              username: response.user.username,
              currentRoom: roomData,
              currentRoomData: roomData,
              score: response.user.score,
              inventory: response.user.inventory,
              completedPuzzles: response.user.completedPuzzles,
              isAuthenticated: true,
              token
            }));
          }
        } catch (error) {
          console.error('[APP] Auth check failed:', error);
          localStorage.removeItem('stationZeroToken');
        }
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
