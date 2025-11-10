import { useState } from "react";
import Balloon from "./pics/ballon.png";
import styles from "./App.module.scss";

interface BalloonType {
  id: number;
  x: number;
  y: number;
}

function App() {
  const [balloons, setBalloons] = useState<BalloonType[]>([]);
  const [score, setScore] = useState(0);
  const [nextId, setNextId] = useState(0);

  const addBalloon = () => {
    const newBalloon: BalloonType = {
      id: nextId,
      x: Math.random() * 85, // 0% to 85% to keep balloons visible
      y: Math.random() * 70 + 10, // 10% to 80% to keep away from button
    };
    
    setBalloons([...balloons, newBalloon]);
    setNextId(nextId + 1);
  };

  const handlePop = (balloonId: number) => {
    setScore(score + 1);
    // Remove balloon after explosion animation
    setTimeout(() => {
      setBalloons(balloons.filter(b => b.id !== balloonId));
    }, 100);
  };

  return (
    <div className={styles.container}>
      <div className={styles.scoreDisplay}>
        🎯 Score: {score}
      </div>

      {balloons.map(balloon => (
        <Balloon
          key={balloon.id}
          id={balloon.id}
          x={balloon.x}
          y={balloon.y}
          onPop={handlePop}
        />
      ))}

      <button className={styles.addBalloonBtn} onClick={addBalloon}>
        + Add Balloon 🎈
      </button>
    </div>
  );
}

export default App;