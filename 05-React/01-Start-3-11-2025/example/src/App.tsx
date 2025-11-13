import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import Flower from './assets/flower.jpg';
import './App.scss'
<<<<<<< Updated upstream
import Card from './view/components/card/Card';
=======
import Card from './View/Components/Card/Card'
>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  return ( //JSX
    <>
      <div>
        <Hi />
        <Card />
<<<<<<< Updated upstream
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
=======
>>>>>>> Stashed changes
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
