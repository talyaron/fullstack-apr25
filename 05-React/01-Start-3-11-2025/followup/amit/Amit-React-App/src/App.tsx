import { useState } from 'react'
import reactLogo from './assets/react.svg'
import reactLogo2 from './assets/image.png'
import viteLogo from '/vite.svg'
import './view/components/card/Card.scss'
import './App.scss'
import Card from './view/components/card/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='title'>Amit App</h1>
      <a href="https://www.google.com/imgres?q=dog&imgurl=https%3A%2F%2F143587181.fs1.hubspotusercontent-eu1.net%2Fhub%2F143587181%2Fhubfs%2FMost%2520Popular%2520Dog%2520Breeds%2520UK-jpg.jpeg%3Fwidth%3D1600%26height%3D914%26name%3DMost%2520Popular%2520Dog%2520Breeds%2520UK-jpg.jpeg&imgrefurl=https%3A%2F%2Fsothebysrealty.co.uk%2Fthe-journal%2Fmost-popular-dog-breeds-uk%2F&docid=w8jrn5ZtPvGByM&tbnid=SgaSZSqmZQGWxM&vet=12ahUKEwiW2NfEw9aQAxUy2QIHHbuwAdQQM3oECCoQAA..i&w=1600&h=914&hcb=2&ved=2ahUKEwiW2NfEw9aQAxUy2QIHHbuwAdQQM3oECCoQAA" target="_blank">
        <img src={reactLogo2} className="logo dog" alt="dog logo" />
      </a>
      <Card />
      <div>
        <h2 className='click-down'>Click down <br />⬇️</h2>
        <button onClick={() => setCount((count) => count + 2 / 2 * 2)}>
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
