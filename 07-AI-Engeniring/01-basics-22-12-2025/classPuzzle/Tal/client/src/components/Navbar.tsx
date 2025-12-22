import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/Button';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="glass border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold text-gradient">Space Tasks</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <span className="text-white/70">
                  Welcome, <span className="text-stellar-cyan">{user?.username}</span>
                </span>
                <Button variant="secondary" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
