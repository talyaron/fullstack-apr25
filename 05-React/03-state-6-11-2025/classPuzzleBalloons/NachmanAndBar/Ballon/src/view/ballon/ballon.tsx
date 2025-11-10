import { useState } from "react";
import { IconButton } from "@mui/material";
import balonPic from "../pics/ballon.png";
import explode from "../pics/image copy.png";
import "./ballon.scss";

interface BalloonProps {
  x: number;
  y: number;
  onPop?: () => void;
}

function Balloon({ x, y, onPop }: BalloonProps) {
  const [isExploded, setIsExploded] = useState(false);

  const handleClick = () => {
    if (!isExploded) {
      setIsExploded(true);
      console.log("💥 BOOM!");
      
      if (onPop) {
        setTimeout(() => onPop(), 500);
      }
    }
  };

  return (
    <IconButton
      className={`balloon ${isExploded ? 'exploded' : ''}`}
      style={{ 
        left: `${x}%`,
        top: `${y}%`,
      }}
      onClick={handleClick}
      disableRipple
    >
      <img
        src={isExploded ? explode : balonPic}
        alt={isExploded ? "💥" : "🎈"}
      />
    </IconButton>
  );
}

export default Balloon;