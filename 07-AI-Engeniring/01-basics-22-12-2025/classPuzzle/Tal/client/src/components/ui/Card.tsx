import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = false }: CardProps) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6
        ${hover ? 'transition-all duration-300 hover:bg-white/15 hover:shadow-glow-purple cursor-pointer' : ''}
        ${className}`}
    >
      {children}
    </div>
  );
};
