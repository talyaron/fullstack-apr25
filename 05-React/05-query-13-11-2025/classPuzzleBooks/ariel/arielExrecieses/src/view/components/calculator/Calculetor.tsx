import { useState } from "react";
import styles from "./Calculetor.module.scss";

const Calculetor = () => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<number>(0);

  const add = () => {
    setResult(Number(num1) + Number(num2));
  };
  const subtract = () => {
    setResult(Number(num1) - Number(num2));
  }
  const multiply = () => {
    setResult(Number(num1) * Number(num2));
  }
  const divide = () => {
    if (Number(num2) !== 0) {
      setResult(Number(num1) / Number(num2));
    } else {
      alert("Cannot divide by zero");
    }
  }
    return (
    <div className={styles.calculator}>
      <h1 className={styles.calculator__title}>Simple Calculator</h1>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1 (e.target.value)}
        placeholder="Enter first number"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2 (e.target.value)}
        placeholder="Enter second number"
      />
      <div className={styles.buttons}>
        <button onClick={add}>+</button>
        <button onClick={subtract}>-</button>
        <button onClick={multiply}>*</button>
        <button onClick={divide}>/</button>
      </div>
      <div className={styles.calculator__result}>Result: {result}</div>
    </div>  
  );
};

export default Calculetor;