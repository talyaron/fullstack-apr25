import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../store/api/authApi';
import { setUser } from '../store/authSlice';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login({ username, password }).unwrap();
      if (result.success && result.data) {
        dispatch(setUser(result.data));
        navigate('/');
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setError(error.data?.message || 'Login failed');
    }
  };

  return (
    <div className="page-center cosmic-bg">
      <Card className="container-sm">
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <span className="text-4xl" style={{ display: 'block', marginBottom: '1rem' }}>🌌</span>
          <h1 className="text-3xl font-bold text-gradient">Welcome Back</h1>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>Sign in to your cosmic workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-col gap-6">
          {error && (
            <div className="alert-error">{error}</div>
          )}

          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <Button type="submit" isLoading={isLoading} fullWidth>
            Sign In
          </Button>
        </form>

        <p className="text-center text-muted" style={{ marginTop: '1.5rem' }}>
          Don't have an account?{' '}
          <Link to="/register" className="text-accent">
            Register here
          </Link>
        </p>
      </Card>
    </div>
  );
};
