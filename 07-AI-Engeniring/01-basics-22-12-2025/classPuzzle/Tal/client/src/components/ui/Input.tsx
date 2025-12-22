import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const inputClasses = [
      'input',
      error ? 'input-error' : '',
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className="input-group">
        {label && (
          <label className="label">{label}</label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="input-error-message">{error}</p>
        )}
        {helperText && !error && (
          <p className="input-helper">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
