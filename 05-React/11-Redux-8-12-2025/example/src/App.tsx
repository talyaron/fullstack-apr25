import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Counter } from './view/components/counter/Counter'
import  CounterView from './view/components/counterView/CounterView'
import Input from './view/components/input/Input'
import Output from './view/components/output/Output'

function App() {


  return (
    <>
      <div>
        <Input />
      </div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <CounterView />
      <Output />
      <Output />
      <Output />
    </>
  )
}

export default App
