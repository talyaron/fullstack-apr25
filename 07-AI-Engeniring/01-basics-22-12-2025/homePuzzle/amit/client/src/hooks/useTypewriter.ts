import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
}

export const useTypewriter = ({ text, speed = 30, delay = 0 }: UseTypewriterOptions) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    setDisplayText('');
    setIsComplete(false);

    let interval: ReturnType<typeof setInterval> | undefined;
    let isCancelled = false;

    const timeout = setTimeout(() => {
      let index = 0;

      interval = setInterval(() => {
        if (isCancelled) {
          clearInterval(interval);
          return;
        }

        if (index >= text.length) {
          setIsComplete(true);
          clearInterval(interval);
          return;
        }

        const char = text.charAt(index);
        setDisplayText((prev) => prev + char);
        index++;
      }, speed);
    }, delay);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  return { displayText, isComplete };
};
