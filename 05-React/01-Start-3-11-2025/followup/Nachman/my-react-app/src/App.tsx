import { useState } from 'react'
import Kermit from './assets/Kermit.avif'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://en.wikipedia.org/wiki/Kermit_the_Frog" target="_blank">
          <img src={Kermit} className="logo" alt="Kermit the frog" />
        </a>
      </div>
      <h1>Kermit Site</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      <p className="Arrow">
        ⬆️ Click the frog! ⬆️
      </p>
      </div>
      <p className="read-the-docs">
        Click on the frog to learn more
      </p>
    </>
  )
}

export default App
