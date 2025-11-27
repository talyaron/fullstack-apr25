import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Modal from './view/components/modal/Modal';

function App() {
  const [count, setCount] = useState(0)
  const [showModal, setShowModal] = useState<boolean>(false)

  function toggleModal() {
    setShowModal(!showModal)
  }

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
      <h1>Vite + React</h1>
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
      <button onClick={toggleModal}>
        {showModal ? 'Hide' : 'Show'} Modal 
      </button>
      {showModal && (
        <Modal>
          <h1>Hi all</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste tempora odio alias molestias laboriosam architecto voluptatibus aliquid, placeat porro aut aperiam incidunt tempore corrupti nisi neque sed quos consequatur reiciendis.</p>
          <button onClick={toggleModal}>Close Modal</button>
        </Modal>
      )}
    </>
  )
}

export default App
