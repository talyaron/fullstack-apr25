import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import Flower from './assets/flower.jpg';
import './App.scss'
import Card from './view/components/card/Card';

function App() {
  const [count, setCount] = useState(0); // 0 = initial value
  let x = 5;
  const [text, setText] = useState("hi"); // "hi" = initial value

  return ( //JSX
    <>
      <div style={{background:"green"}}>
        <Hi />
        <Card />
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <p>{text}</p>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <img src={Flower} className="flower" alt="Flower" />
      <h1>Tal's App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => {
          x++;
          console.log(x);
        }}>
          x is {x}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App


function Hi() {
  return <h1>Hola!</h1>
}
