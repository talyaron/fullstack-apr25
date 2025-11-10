import styles from "./App.module.scss"
import Balloon from './view/components/balloon/Balloon'
import { useState } from "react";

interface Balloon {
  x:number;
  y:number;
}

function App() {

  const [balloons, setBallons] = useState<Balloon[]>([{x:40,y: 60}])

  function randomPosition(): Balloon {
    return {x: Math.ceil(Math.random() * 75) + 10, y: Math.ceil(Math.random() * 50) + 10}
  }

  return (
    <>
    <div className={styles.root}>
    {
      balloons.map((balloon,i)=><Balloon key={i} x={balloon.x} y={balloon.y} />)
    }        

    <button onClick={() => setBallons([...balloons, randomPosition()])}>Add Balloon</button>
    </div>
    </>
  )
}

export default App
