import { useState } from "react";
import styles from "./App.module.scss";
import { RandomNumber } from "./view/components/random/RandomNumber";
import { EvenButton } from "./view/components/even/EvenButton";
import { OddButton } from "./view/components/odd/OddButton";

function App() {
  const [number, setNumber] = useState<number>(0);
  const [color, setColor] = useState<"green" | "red" | "black">("black");

  function handleGenerate(num: number) {
    setNumber(num)
    setColor("black");
  }

  function correct() {
    setColor("green");
  }

  function wrong() {
    setColor("red");
  }

  return (
    <div className={styles.container}>
        <div style={{background: color}}>

        <h1>Even or Odd</h1>

        <div className={styles.box}>
          <RandomNumber onGenerate={handleGenerate} />
          The Number Is {number}
        </div>
        <div>
          <EvenButton num={number} onCorrect={correct} onWrong={wrong}/>
          <OddButton num={number} onCorrect={correct} onWrong={wrong} />
        </div>

      </div>
    </div>
  )
}

export default App
