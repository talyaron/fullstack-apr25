import { useState } from "react";
import ballonSrc from "./pics/ballon.png";
import styles from "./App.module.scss";

function App() {
  const [balloonPosition] = useState({
    x: Math.random() * 70 + 15, // 15% to 85%
    y: Math.random() * 50 + 20, // 20% to 70%
  });

  return (
    <div className={styles.container}>
      <button onClick={() => console.log("Balloon clicked!")}>
        
 <img
        src={ballonSrc}
        alt="balloon"
        className={styles.balloon}
        style={{ position: "absolute", left: `${balloonPosition.x}%`, top: `${balloonPosition.y}%`, cursor: "pointer" }}
      />
      </button>
     
    </div>
  );
}

export default App;