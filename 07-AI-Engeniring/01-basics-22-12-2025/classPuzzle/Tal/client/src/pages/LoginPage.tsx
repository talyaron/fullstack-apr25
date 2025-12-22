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
    <div className="min-h-screen flex items-center justify-center cosmic-bg px-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🌌</span>
          <h1 className="text-3xl font-bold text-gradient">Welcome Back</h1>
          <p className="text-white/60 mt-2">Sign in to your cosmic workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
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

          <Button type="submit" isLoading={isLoading} className="w-full">
            Sign In
          </Button>
        </form>

        <p className="text-center mt-6 text-white/60">
          Don't have an account?{' '}
          <Link to="/register" className="text-stellar-cyan hover:underline">
            Register here
          </Link>
        </p>
      </Card>
    </div>
  );
};
