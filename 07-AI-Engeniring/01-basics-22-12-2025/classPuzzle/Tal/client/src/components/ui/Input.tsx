import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white/80">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg
            focus:outline-none focus:ring-1 transition-all duration-300
            placeholder-white/40
            ${error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-white/20 focus:border-stellar-cyan focus:ring-stellar-cyan'
            } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
