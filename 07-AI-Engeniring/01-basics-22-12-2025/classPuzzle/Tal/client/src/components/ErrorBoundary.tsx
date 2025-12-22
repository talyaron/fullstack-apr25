import { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center cosmic-bg px-4">
          <Card className="max-w-md text-center">
            <span className="text-6xl mb-4 block">💫</span>
            <h2 className="text-2xl font-bold text-gradient mb-4">
              Houston, We Have a Problem
            </h2>
            <p className="text-white/60 mb-6">
              Something went wrong in the cosmos. Don't worry, our engineers are on it.
            </p>
            {this.state.error && (
              <p className="text-red-400 text-sm mb-6 p-3 bg-red-500/10 rounded-lg">
                {this.state.error.message}
              </p>
            )}
            <Button onClick={this.handleReset}>
              Return to Mission Control
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
