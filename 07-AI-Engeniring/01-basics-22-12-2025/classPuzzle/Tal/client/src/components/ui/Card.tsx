import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Card = ({
  children,
  className = '',
  hover = false,
  size = 'md',
}: CardProps) => {
  const sizeClasses = {
    sm: 'card-sm',
    md: '',
    lg: 'card-lg',
  };

  const classes = [
    hover ? 'card-hover' : 'card',
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
