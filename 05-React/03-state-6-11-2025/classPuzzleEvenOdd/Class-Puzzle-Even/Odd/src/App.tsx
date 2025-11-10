import { useState } from 'react'
import './App.css'
import Game from './view/components/game/Game';

function App() {
  const [number, setNumber] = useState(getRandomNumber());

  return (
    <>
    <button onClick={()=>setNumber(getRandomNumber())}>Get Random Button</button>
      <Game number={number} />
      
    </>
  )
}
function getRandomNumber() {
  return Math.ceil(Math.random() * 100);
}
export default App
