import { useEffect, useState } from "react";

function generateRandom() {
    return Math.ceil(Math.random() * 100);
}

/**
 * A custom React hook that generates and returns a random number that updates every second.
 * 
 * @returns {number} A random number that is automatically updated every 1000ms (1 second)
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const randomValue = useRandom();
 *   return <div>Random number: {randomValue}</div>;
 * }
 * ```
 * 
 * @remarks
 * - The hook starts with an initial random number on mount
 * - Sets up an interval that updates the random number every second
 * - Automatically cleans up the interval when the component unmounts
 * - The interval cleanup runs when the component using this hook is unmounted
 */
function useRandom() {
      const [randomNumber, setRandomNumber] = useState(generateRandom());

      useEffect(() => {
          const intervalId = setInterval(() => {
              setRandomNumber(generateRandom());
          }, 1000);

          return () => clearInterval(intervalId);  // cleanup on unmount
      }, []);

      return randomNumber;
  }

export default useRandom;