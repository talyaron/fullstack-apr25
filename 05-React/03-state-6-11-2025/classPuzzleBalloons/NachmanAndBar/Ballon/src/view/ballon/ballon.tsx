import { useState } from "react";
import "./Balloon.scss";

interface BalloonProps {
  id: number;
  x: number;
  y: number;
  onPop: (id: number) => void;
}

function Balloon({ id, x, y, onPop }: BalloonProps) {
  const [isExploded, setIsExploded] = useState(false);

  const handleClick = () => {
    if (!isExploded) {
      setIsExploded(true);
      console.log("💥 BOOM!");
      
      setTimeout(() => onPop(id), 500);
    }
  };

  return (
    <button
      className={`balloon ${isExploded ? 'exploded' : ''}`}
      style={{ 
        '--balloon-y': `${y}%`,
        '--balloon-delay': `${x * 0.05}s`
      } as React.CSSProperties}
      onClick={handleClick}
    >
      {isExploded ? '💥' : '🎈'}
    </button>
  );
}

export default Balloon;