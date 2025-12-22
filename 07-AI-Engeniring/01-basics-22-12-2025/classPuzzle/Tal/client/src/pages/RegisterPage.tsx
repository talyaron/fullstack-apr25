import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../store/api/authApi';
import { setUser } from '../store/authSlice';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const result = await register({ username, password }).unwrap();
      if (result.success && result.data) {
        dispatch(setUser(result.data));
        navigate('/');
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setError(error.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="page-center cosmic-bg">
      <Card className="container-sm">
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <span className="text-4xl" style={{ display: 'block', marginBottom: '1rem' }}>🚀</span>
          <h1 className="text-3xl font-bold text-gradient">Join the Cosmos</h1>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>Create your account and start exploring</p>
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
            placeholder="Choose a username"
            required
            minLength={3}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            minLength={6}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />

          <Button type="submit" isLoading={isLoading} fullWidth>
            Create Account
          </Button>
        </form>

        <p className="text-center text-muted" style={{ marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link to="/login" className="text-accent">
            Sign in here
          </Link>
        </p>
      </Card>
    </div>
  );
};
