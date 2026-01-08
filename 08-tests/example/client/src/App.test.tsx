import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  describe('handleClick', () => {
    it('should increment count by 1 when button is clicked', () => {
      render(<App />);

      const button = screen.getByRole('button', { name: /count is 0/i });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument();
      // By role (recommended)
      screen.getByRole('button');
      screen.getByRole('textbox', { name: /username/i });

      // By label text
      screen.getByLabelText(/username/i);

      // By placeholder text
      screen.getByPlaceholderText(/enter your name/i);

      // By test id
      screen.getByTestId('submit-button');

      // By alt text (for images)
      screen.getByAltText(/profile picture/i);

      // By title attribute
      screen.getByTitle(/tooltip text/i);

      // By display value (for form elements)
      screen.getByDisplayValue(/current value/i);
    });

    it('should increment count multiple times on multiple clicks', () => {
      render(<App />);

      const button = screen.getByRole('button', { name: /count is 0/i });

      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(screen.getByRole('button', { name: /count is 3/i })).toBeInTheDocument();
    });
  });
});
